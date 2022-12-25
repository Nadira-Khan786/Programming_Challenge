import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuotesData } from "../api/service";
import { QuotesData } from "../modal/QuotesData";
import TableView from "./TableView";
import "./Quotes.scss";
import { NavLink } from "react-router-dom";

type paramtype = {
  [key: string]: string | undefined;
};
type Order = "asc" | "desc";
const tableHead = ["Price", "Time", "Validtill"];

function Quotes() {
  let { id }: paramtype = useParams();
  const [quotesData, setQuotesData] = useState<QuotesData[]>([]);
  const [orderType, setOrderType] = useState<Order>("asc");

  useEffect(() => {
    if (id)
      fetchQuotesData(id).then((res) => {
        setQuotesData(id && res?.[id]);
      });
  }, [id]);

  const sortData = (order: Order, sortBy = "Time") => {
    setOrderType(order);
    let data = [...quotesData];
    data.sort((a, b) => {
      if (sortBy !== "Time") {
        if (new Date(a.valid_till) < new Date(b.valid_till))
          return order === "desc" ? 1 : -1;
        if (new Date(a.valid_till) > new Date(b.valid_till))
          return order === "desc" ? -1 : 1;
        return 0;
      } else {
        if (new Date(a.time) < new Date(b.time))
          return order === "desc" ? 1 : -1;
        if (new Date(a.time) > new Date(b.time))
          return order === "desc" ? -1 : 1;
        return 0;
      }
    });
    setQuotesData(data);
  };
  return (
    <div className="quotes-ctn">
      <div className="title-row">
        <div className="title">
          <NavLink to="/" className="name">
            {" "}
            stocket{" "}
          </NavLink>
          <span> / </span>
          <span className="id">{id}</span>
        </div>
      </div>
      <TableView
        tableheader={tableHead}
        quotesDetails={quotesData}
        quotesTableBody={true}
        sortData={sortData}
        orderType={orderType}
      />
    </div>
  );
}

export default Quotes;
