import { useEffect, useState } from "react";
import { fetchStocksData } from "../api/service";
import { StcokData } from "../modal/StcokData";
import TableView from "./TableView";
import "./Stocks.scss";

type Order = "asc" | "desc";

function Stocks() {
  const [stockData, setStockData] = useState<StcokData[]>([]);
  const [searchData, setSearchData] = useState<StcokData[]>([]);
  const [orderType, setOrderType] = useState<Order>("asc");

  const tableHead = ["Symbol", "Name", "Sector", "Validtill"];

  useEffect(() => {
    fetchStocksData().then((res) => {
      const data = res.filter((item) => item.Symbol);
      setStockData(data);
      setSearchData(data);
    });
  }, []);

  const searchItem = (query: string) => {
    if (!query) {
      setSearchData(stockData);
      return;
    }
    let data = stockData.filter(
      (item) =>
        item.Symbol.toLowerCase().includes(query.toLowerCase()) ||
        item.Name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchData(data);
  };

  const sortData = (order: Order) => {
    setOrderType(order);
    let data = [...searchData];
    data.sort((a, b) => {
      if (new Date(a.valid_till) < new Date(b.valid_till))
        return order === "desc" ? 1 : -1;
      if (new Date(a.valid_till) > new Date(b.valid_till))
        return order === "desc" ? -1 : 1;

      // let x = a.Symbol.toLowerCase();
      // let y = b.Symbol.toLowerCase();
      // if (x < y) return order === "desc" ? 1 : -1;
      // if (x > y) return order === "desc" ? -1 : 1;
      return 0;
    });
    console.log("order1", data, searchData);
    setSearchData(data);
  };
  return (
    <div className="stocket-ctn">
      <div className="title-row">
        <div className="title">Stocks</div>
        <div className="search-container">
          <input
            type="search"
            onChange={(e) => searchItem(e.target.value)}
            placeholder="Search"
            className="search"
          />
        </div>
      </div>
      <TableView
        tableheader={tableHead}
        tablebody={searchData}
        quotesTableBody={false}
        sortData={sortData}
        orderType={orderType}
      />
    </div>
  );
}

export default Stocks;
