import { useContext } from "react";
import { stockContext } from "../../../../Contexts/stockContext";

export default function CompanyDescription() {
  const { metaData } = useContext(stockContext)

  return (
    <>
    <h3 className="mt-4 mb-2 text-center">Company Description</h3>
      <p style={{textAlign:"justify"}}>
            {metaData.description}
          </p>
    </>
  )
}
