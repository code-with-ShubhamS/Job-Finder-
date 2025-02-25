import React, { useEffect, useState } from 'react'
import { Search, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import CompanyTable from './CompanyTable';
import { useDispatch, useSelector } from 'react-redux';
import {CompanyAction} from "../../../redux/Company.js"
import { VITE_COMPANY_API_END_POINT } from '../../../URI.js';

const Companies = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const {allCompany:company}= useSelector(store=>store.company);
    const dispatch = useDispatch();
    useEffect(()=>{
      async function fetchAllCompanies() {
        try {
          setLoading(false)
          const res = await fetch(`${VITE_COMPANY_API_END_POINT}/get`,{
            method:"GET",
            credentials:"include"
          })
          const data = await res.json();
          if(data.success){
            dispatch(CompanyAction.setCompanies(data.company))
          }
          toast({
            title: data?.msg,
            status: "success",
            duration: 2000,
          })

        } catch (error) {
          console.log(error)
          toast({
            varient:"destructive",
            title:"Opps! Something went wrong",
            description: error?.msg,
            duration: 2000,
          })
        }finally{
          setLoading(false)
        }
        }
      fetchAllCompanies()
    },[])
  return (
    <div className="flex-grow">
      {/* Main Content */}
      <main className="p-6">
        {/* Actions Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filter by name..."
              className="pl-10  border-border"
            //   value={searchTerm}
            //   onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            className="hover:bg-white/90 text-primary-foreground bg-white"
            onClick={()=>{navigate("/admin/companies/create")}}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Company
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-md border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50">
                <TableHead className="text-white">Logo</TableHead>
                <TableHead className="text-white">Comapny Name</TableHead>
                <TableHead className="text-white">Created Date</TableHead>
                <TableHead className="w-[100px] text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : company.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground text-white">
                    No companies found
                  </TableCell>
                </TableRow>
              ) : (
                
                company.map((company) => (
                  <CompanyTable company={company}  key={company?._id}/>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}

export default Companies;



