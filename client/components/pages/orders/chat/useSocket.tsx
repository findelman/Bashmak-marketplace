import { useCallback, useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import $api from "../../../../http/api-manipulation"
import { useOrders } from "../../../../store/hooks/useOrders"

export const useSocket = (body) => {
  const [socket, setSocket] = useState<any>(null)
  const { chatId } = useOrders()
  const [messages, setMessages] = useState<any>([])
  const newDate = new Date()
  const [inputValue, setInputValue] = useState("")
  const [perPage, setPerPage] = useState(10)
  const scrollRef = useRef(0)

  // Логика пагинации
  const handleScroll = () => {
    if (body.current.scrollTop === 0) {
      // if (socket) {
      setPerPage((e) => (e += 10))
      body.current.scrollTo(0, body.current.scrollHeight)
      // }
    }
  }
  // Слушатель событий сокета, реагирует на всё
  const listener = (even, ...args) => {
    console.log(even, args)
    // Записываем данные которые нам отправляют
    if (args[0].notification === "new_message") {
      // Ставим дату, с бэка не приходит
      args[0].data.create_datetime = newDate
      setMessages((arg) => [...arg, args[0].data])
    }

    if (even === "send_message" && args[0].success === true) {
      body.current.scrollTo(0, body.current.scrollHeight)
    }
    if (even === "get_messages") {
    }
    if (even === "error" && args[0].error.code === "error_code_invalid_per_page") {
      body.current.scrollTo(0, 0)
      body.current.removeEventListener("scroll", handleScroll)
    }
  }

  useEffect(() => {
    if (body.current) scrollRef.current = body.current.scrollTop
  }, [messages])

  useEffect(() => {
    console.log(scrollRef.current, body.current.scrollHeight)
    if (body.current) body.current.scrollTo(0, scrollRef.current)
    // Скролим вниз при первом получений даных, нужно чтоб не ломалась пагинация
    if (messages.length === 10) body.current.scrollTo(0, body.current.scrollHeight)
  }, [messages])

  useEffect(() => {
    const socket = io("https://dev-api.ic-market.org", {
      path: "/flowers/socket.io",
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    setSocket(socket)

    let oldData = []
    // Слушаем получение данных, записываем их
    socket.on("get_messages", (data) => {
      if (data.messages.reverse().length === oldData.length) {
        body.current.removeEventListener("scroll", handleScroll)
      }
      oldData = data.messages.reverse()
      setMessages(data.messages.reverse())
    })

    // Получаем данные
    socket.emit("get_messages", {
      chat_id: chatId,
      page: 1,
      per_page: perPage,
    })

    // Слушаем событие при отправке сообщения
    socket.on("send_message", (response) => {
      // Возвращает true когда сообщение отправилось
      if (response.success === true) {
        console.log(inputValue)
        setInputValue("")
      }
    })

    body.current.addEventListener("scroll", handleScroll)
    // Слушаем все события
    socket.onAny(listener)
    return () => {
      // отключаемся при закрытий модалки
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket)
      socket.emit("get_messages", {
        chat_id: chatId,
        page: 1,
        per_page: perPage,
      })
  }, [perPage])

  //   Загрузка картинки
  async function uploadFile(formData) {
    try {
      const response = await $api.post("file/upload", formData)
      console.log(response.data, "ВО")
      socket.emit("send_message", {
        chat_id: chatId,
        files: [response.data.file.id],
      })

      setMessages([
        ...messages,
        {
          files: [{ url: response.data.file.url }],
          sender: { id: 1, type: "company" },
          create_datetime: newDate,
        },
      ])
    } catch (error) {
      console.error(error)
    }
  }

  //   Добовление картинки
  const changeFile = (event) => {
    event.preventDefault()

    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("file", file)
    uploadFile(formData)
  }

  const formatCreateDate = (date) => {
    date = new Date(date)
    return `${date.getDate()}.${date.getMonth() + 1}.${date
      .getFullYear()
      .toString()
      .substr(2)}, ${date.getHours()}:${
      date.getMinutes().toString().length === 2 ? date.getMinutes() : "0" + date.getMinutes()
    }`
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (socket)
        socket.emit("send_message", {
          chat_id: chatId,
          text: inputValue,
        })
      setMessages((arg) => [
        ...arg,
        {
          text: inputValue,
          sender: {
            id: 1,
            type: "company",
          },
          create_datetime: newDate,
        },
      ])
    }
  }

  useEffect(() => {
    console.log(perPage, "PERPAGE !")
  }, [perPage])

  return {
    messages,
    inputValue,
    setInputValue,
    formatCreateDate,
    changeFile,
    chatId,
    handleKeyPress,
  }
}
