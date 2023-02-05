import React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"

const PaginationS = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`

const PaginationItemS = styled.button<{ isActive?: boolean }>`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  background: ${({ isActive }) => (isActive ? "white" : "transparent")};
  border: 1px solid ${({ isActive }) => (isActive ? "white" : "#524F56")};
  color: ${({ isActive }) => (isActive ? "black" : "white")};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  transition: var(--default-transition) linear;
  :hover {
    color: #524f56;
    background: white;
  }
`

const PaginationItem = ({ isActive, text, setActive, onClick }: any) => {
  return (
    <PaginationItemS
      onClick={(e) => {
        onClick(e)
        if (setActive) setActive(text)
      }}
      isActive={isActive === text}
    >
      {text}
    </PaginationItemS>
  )
}

export const Pagination = React.memo(function Pagination({
  data,
  activeTab,
  paginationClick,
}: any) {
  const [active, setActive] = useState<any>("1")

  useEffect(() => {
    setActive(1)
  }, [activeTab])

  return (
    <PaginationS>
      {data &&
        Array(data.pages)
          .fill(0)
          .map((item, index) => {
            return (
              <PaginationItem
                key={index}
                onClick={paginationClick}
                setActive={setActive}
                text={++index}
                isActive={active}
              />
            )
          })}
    </PaginationS>
  )
})
