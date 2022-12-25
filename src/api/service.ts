import axios from "axios";

// fatch stock api data
export const fetchStocksData = async () => {
  const response = await axios.get(
    "https://prototype.sbulltech.com/api/v2/instruments"
  );
  return await csvJSON(response.data);
};

// fatch quotes data by symbol 
export const fetchQuotesData = async (symbole: string) => {
  const response = await axios.get(
    `https://prototype.sbulltech.com/api/v2/quotes/${symbole}`
  );
  return response?.data?.payload;
};


function csvJSON(csv: any) {
  var lines = csv.split("\n");

  var result = [];
  var headers = lines[0].split(",");
  for (var i = 1; i < lines.length; i++) {
    var obj: any = {};
    var currentline = lines[i].split(",");
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}
