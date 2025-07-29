import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, FileDown } from 'lucide-react';

const sampleRCData = 
[
    {
        "veh_no": "DL1LAC6278",
        "Owner_Name": "GANESH SINGH",
        "SonWifeDaughter_of": "",
        "Present_Address": "SRS-104 PEERA GARHI SUNDER VIHAR, S.O, , New Delhi, Delhi,",
        "Engine_Number": "275CNG16CPYS40417",
        "Chassis_Number": "MAT445316KVC16728",
        "Seating_Capacity": 2,
        "Registration_Date": "2019-06-13T00:00:00.000Z",
        "Registered_At": "RAJPUR ROAD/VIU BURARI, Delhi",
        "Body_Type": "OPEN BODY",
        "Fitness_Valid_Upto": "2027-06-16T00:00:00.000Z",
        "Road_Tax": "2026-03-31T00:00:00.000Z",
        "RC_Status": "ACTIVE",
        "Insurance_Policy_Number": "POCMVGC0100349620",
        "Insurance_Valid_Upto": "2026-05-23T00:00:00.000Z",
        "Insurance_Company": "SBI General",
        "PUCC_Number": "DL01001120076202",
        "PUCC_Upto": "2026-06-15T00:00:00.000Z",
        "Unladen_Weight": 840,
        "National_Permit_Number": "",
        "National_Permit_Upto": "1900-01-01T00:00:00.000Z",
        "National_Permit_Issue_By": "",
        "Permit_Number": "",
        "Permit_Upto": "1900-01-01T00:00:00.000Z",
        "Permit_Valid_From": "1900-01-01T00:00:00.000Z",
        "Standing_Capacity": 0,
        "BlackList": "",
        "Vehicle_Category": "LGV",
        "Cylinders": 2,
        "Fuel_Type": "CNG ONLY",
        "Sleeping_Capacity": 0,
        "Permit_type": "",
        "Date_Created": "2024-08-25T00:00:00.000Z"
    },
    {
        "veh_no": "DL1LAJ0249",
        "Owner_Name": "GANESH SINGH",
        "SonWifeDaughter_of": "",
        "Present_Address": "SRS-104 PEERA GARHI SUNDER VIHAR, S.O, , New Delhi, Delhi, 110087",
        "Engine_Number": "G12BN1164937",
        "Chassis_Number": "MA3EZLF1T00258065",
        "Seating_Capacity": 2,
        "Registration_Date": "2022-12-02T00:00:00.000Z",
        "Registered_At": "RAJPUR ROAD/VIU BURARI, Delhi",
        "Body_Type": "OPEN BODY",
        "Fitness_Valid_Upto": "2026-12-18T00:00:00.000Z",
        "Road_Tax": "2026-03-31T00:00:00.000Z",
        "RC_Status": "ACTIVE",
        "Insurance_Policy_Number": "POCMVGC0100224180",
        "Insurance_Valid_Upto": "2026-02-22T00:00:00.000Z",
        "Insurance_Company": "SBI General",
        "PUCC_Number": "DL01000350037763",
        "PUCC_Upto": "2026-02-28T00:00:00.000Z",
        "Unladen_Weight": 975,
        "National_Permit_Number": "",
        "National_Permit_Upto": "1900-01-01T00:00:00.000Z",
        "National_Permit_Issue_By": "",
        "Permit_Number": "",
        "Permit_Upto": "1900-01-01T00:00:00.000Z",
        "Permit_Valid_From": "1900-01-01T00:00:00.000Z",
        "Standing_Capacity": 0,
        "BlackList": "",
        "Vehicle_Category": "LGV",
        "Cylinders": 4,
        "Fuel_Type": "CNG ONLY",
        "Sleeping_Capacity": 0,
        "Permit_type": "",
        "Date_Created": "2024-08-25T00:00:00.000Z"
    },
    {
        "veh_no": "DL1LAJ7603",
        "Owner_Name": "RAJNISH KUMAR CHAND",
        "SonWifeDaughter_of": "",
        "Present_Address": "H NO-487/36 VILLAGE  PEERAGARHI, DELHI, , New Delhi, Delhi, 110063",
        "Engine_Number": "G12BN1200139",
        "Chassis_Number": "MA3EZLF1T00272610",
        "Seating_Capacity": 2,
        "Registration_Date": "2023-04-10T00:00:00.000Z",
        "Registered_At": "RAJPUR ROAD/VIU BURARI, Delhi",
        "Body_Type": "OPEN BODY",
        "Fitness_Valid_Upto": "2025-04-09T00:00:00.000Z",
        "Road_Tax": "2023-04-30T00:00:00.000Z",
        "RC_Status": "Fitness Expired",
        "Insurance_Policy_Number": "OG-25-9910-1803-00001727",
        "Insurance_Valid_Upto": "2025-04-08T00:00:00.000Z",
        "Insurance_Company": "Bajaj Allianz General Insurance Co. Ltd.",
        "PUCC_Number": "DL01100170016725",
        "PUCC_Upto": "2025-04-10T00:00:00.000Z",
        "Unladen_Weight": 975,
        "National_Permit_Number": "",
        "National_Permit_Upto": "1900-01-01T00:00:00.000Z",
        "National_Permit_Issue_By": "",
        "Permit_Number": "",
        "Permit_Upto": "1900-01-01T00:00:00.000Z",
        "Permit_Valid_From": "1900-01-01T00:00:00.000Z",
        "Standing_Capacity": 0,
        "BlackList": "",
        "Vehicle_Category": "LGV",
        "Cylinders": 4,
        "Fuel_Type": "CNG ONLY",
        "Sleeping_Capacity": 0,
        "Permit_type": "",
        "Date_Created": "2024-08-25T00:00:00.000Z"
    },
    {
        "veh_no": "DL1LQ5147",
        "Owner_Name": "NARENDER",
        "SonWifeDaughter_of": "",
        "Present_Address": "487/182 PEERA GARHI VILLAGE, PASCHIM VIHAR, NEW DELHI, , Delhi, 110000",
        "Engine_Number": "A2C0616387",
        "Chassis_Number": "MA1LD2FGFC5D96032",
        "Seating_Capacity": 2,
        "Registration_Date": "2012-08-14T00:00:00.000Z",
        "Registered_At": "RAJPUR ROAD/VIU BURARI, Delhi",
        "Body_Type": "OPEN BODY",
        "Fitness_Valid_Upto": "2025-08-11T00:00:00.000Z",
        "Road_Tax": "2025-07-31T00:00:00.000Z",
        "RC_Status": "ACTIVE",
        "Insurance_Policy_Number": "POCMVGC0100323119",
        "Insurance_Valid_Upto": "2026-04-18T00:00:00.000Z",
        "Insurance_Company": "SBI General",
        "PUCC_Number": "DL01002040003862",
        "PUCC_Upto": "2025-09-06T00:00:00.000Z",
        "Unladen_Weight": 685,
        "National_Permit_Number": "",
        "National_Permit_Upto": "1900-01-01T00:00:00.000Z",
        "National_Permit_Issue_By": "",
        "Permit_Number": "",
        "Permit_Upto": "1900-01-01T00:00:00.000Z",
        "Permit_Valid_From": "1900-01-01T00:00:00.000Z",
        "Standing_Capacity": 0,
        "BlackList": "",
        "Vehicle_Category": "3WT",
        "Cylinders": 1,
        "Fuel_Type": "CNG ONLY",
        "Sleeping_Capacity": 0,
        "Permit_type": "",
        "Date_Created": "2024-08-25T00:00:00.000Z"
    }
]
const RCRowExpanded = ({ rc }) => (
  <div className="bg-gray-50 p-4 text-sm grid grid-cols-2 md:grid-cols-3 gap-4 border-t">
    {Object.entries(rc).map(([key, value]) => (
      <div key={key}>
        <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
        <span className="ml-1">{value}</span>
      </div>
    ))}
  </div>
);

const RCTable = () => {
  const [data] = useState(sampleRCData);
  const [expanded, setExpanded] = useState({});

  const columns = useMemo(
    () => [
      {
        header: 'Vehicle No',
        accessorKey: 'veh_no',
      },
      {
        header: 'Owner Name',
        accessorKey: 'Owner_Name',
      },
      {
        header: 'Reg. Date',
        accessorKey: 'Registration_Date',
      },
      {
        header: 'Fuel',
        accessorKey: 'Fuel_Type',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => (
          <button
            className="text-blue-600 hover:underline flex items-center justify-center gap-1"
            onClick={() => row.toggleExpanded()}
          >
            {row.getIsExpanded() ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {row.getIsExpanded() ? 'Hide' : 'View'}
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
  });

  const handleExport = async () => {
    const XLSX = await import('xlsx');
    const { saveAs } = await import('file-saver');
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'RC Data');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout]), 'rc_data.xlsx');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">RC Table</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={handleExport}
        >
          <FileDown size={16} /> Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm border ">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-2 text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                <tr className="border-b">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={columns.length}>
                      <RCRowExpanded rc={row.original} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RCTable;
