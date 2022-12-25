import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import "./TableView.scss";
import { useNavigate } from "react-router-dom";
import { StcokData } from "../modal/StcokData";
import { QuotesData } from "../modal/QuotesData";

type Props = {
  tableheader: string[];
  tablebody?: StcokData[] | undefined;
  quotesDetails?: QuotesData[];
  quotesTableBody: boolean;
  sortData: (order: "asc" | "desc", sortBy: string) => void;
  orderType: "asc" | "desc";
};

const TableView: React.FC<Props> = (props) => {
  const {
    tableheader,
    tablebody,
    quotesTableBody,
    quotesDetails,
    sortData,
    orderType,
  } = props;
  const [active, setActive] = useState<string>("");

  const navigate = useNavigate();
  const redirectQuotes = (Symbol: string) => {
    navigate(`/quotes/${Symbol}`);
  };
  return (
    <TableContainer className="table-container">
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table"
        className="table-ctn"
      >
        <TableHead className="table-head">
          <TableRow className="table-head-row">
            {tableheader.map((item) => {
              return (
                <TableCell className="table-head-cell">
                  {item === "Validtill" || item === "Time" ? (
                    <TableSortLabel
                      direction={orderType}
                      active={item === active}
                      onClick={() => {
                        setActive(item);
                        sortData(orderType === "asc" ? "desc" : "asc", item);
                      }}
                    >
                      {item}
                    </TableSortLabel>
                  ) : (
                    <>{item}</>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {quotesTableBody ? (
            <>
              {quotesDetails?.map((quotes: QuotesData, index) => {
                return (
                  <TableRow key={index} className="table-body-row">
                    <TableCell className="table-body-cell">
                      {parseFloat(quotes?.price)?.toFixed(2)}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {quotes?.time}
                    </TableCell>{" "}
                    <TableCell className="table-body-cell">
                      {quotes?.valid_till}
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          ) : (
            <>
              {!tablebody?.length ? (
                <TableRow className="table-body-row">
                  <TableCell
                    colSpan={tableheader?.length}
                    className="table-body-cell"
                  >
                    No records
                  </TableCell>
                </TableRow>
              ) : (
                tablebody?.map((row: StcokData, index) => {
                  return (
                    <TableRow key={index} className="table-body-row">
                      {tableheader.map((item: string) => {
                        return (
                          <TableCell
                            key={item}
                            className={
                              item === "Symbol"
                                ? "table-body-cell underline"
                                : "table-body-cell"
                            }
                            onClick={() =>
                              item === "Symbol" && redirectQuotes(row[item])
                            }
                          >
                            {item && row[item]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
