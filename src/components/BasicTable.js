import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
// import Mock_Data from "./MOCK_DATA.json";
// import { COLUMNS, Grouped_Columns } from "./columns";
import "./table.css";
import { useEffect } from "react";
const axios = require('axios').default;

const url ='https://fakestoreapi.com/products'

 const tableColumn =[
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Title',
    accessor: 'title'
  },
  {
    Header: 'Price',
    accessor: 'price'
  },
  {
    Header: 'Description',
    accessor: 'description'
  },
  {
    Header: 'Image',
    accessor: 'image',
    Cell: ({row})=> <img width={25} src={row.values.image} alt="" />
  },
 ]
const BasicTable = () => {
  const [products, setProducts] = useState([])
  const columns = useMemo(() =>tableColumn, []);
  const data = useMemo(() => products, [products]);



// console.log(products)

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
    useEffect( ()=>{
      const fetchProducts = async()=>{
        try{
          const {data} = await axios.get(url)
          setProducts(data)
        }
        catch(error){
          console.log(error);
        }
      }
      fetchProducts()
      }, [])
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}> {column.render("Header")}</th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* <tfoot>
          {
            footerGroups.map(footerGroup=>
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map(column=>
                  <td {...column.getFooterProps}>
                    {
                      column.render('Footer')
                    }
                  </td>
                )}
              </tr>
              )
          }
        </tfoot> */}
      </table>
    </div>
  );
};

export default BasicTable;
