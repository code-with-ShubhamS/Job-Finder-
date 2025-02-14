import React from 'react'
import { Building2, MoreVertical, Search, Plus } from "lucide-react";
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
const Companies = () => {
    const navigate = useNavigate();
    // const [searchTerm, setSearchTerm] = useState("");
    // const { data: companies = [], isLoading } = useQuery({ 
    //   queryKey: ["/api/companies"] 
    // });
  
    // const filteredCompanies = companies.filter(company =>
    //   company.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );
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
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="w-[100px] text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {false ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : [{id:"123",name:"google",registrationDate:"12:23:3456"}].length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground text-white">
                    No companies found
                  </TableCell>
                </TableRow>
              ) : (
                
                [{id:"123",name:"google",registrationDate:"12:23:3456"}].map((company) => (
                  <TableRow key={company.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-white">{company.name}</TableCell>
                    <TableCell className="text-muted-foreground text-white">
                      {new Date(company.registrationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8 p-0 bg-white">
                        <MoreVertical className="h-4 w-4 " />
                      </Button>
                    </TableCell>
                  </TableRow>
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



