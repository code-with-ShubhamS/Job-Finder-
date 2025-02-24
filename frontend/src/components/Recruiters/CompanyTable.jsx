import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { MoreHorizontal, Pencil } from "lucide-react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "../ui/popover";
import { useNavigate } from "react-router-dom";

const CompanyTable = ({ company }) => {
  const navigate = useNavigate()
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          {/* <Building2 className="h-5 w-5 text-white" /> */}
          <img
            src={company?.logo || "default.png"}
            alt="Company Logo"
            className="w-10 h-10 rounded-full object-cover object-center"
          />
        </div>
      </TableCell>
      <TableCell className="font-medium text-white">{company?.name}</TableCell>
      <TableCell className="text-muted-foreground text-white">
        {new Date(company?.updatedAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        {/* <Button variant="ghost" size="icon" className="h-8 w-8 p-0 bg-white"></Button> */}
          {/*  */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-white-70 bg-white"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="end">
              <div
                className="flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded-sm cursor-pointer"
                onClick={() => {
                  navigate(`/admin/companies/${company._id}`)
                }}
              >
                <Pencil className="h-4 w-4" />
                <span>Edit</span>
              </div>
            </PopoverContent>
          </Popover>
          {/*  */}
          {/* <MoreVertical className="h-4 w-4 " /> */}
        
      </TableCell>
    </TableRow>
  );
};

export default CompanyTable;
