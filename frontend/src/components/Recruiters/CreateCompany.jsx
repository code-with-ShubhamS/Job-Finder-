import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const CreateCompany = ({ onContinue, onCancel }) => {
    const [companyName, setCompanyName] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
  
    useEffect(() => {
      setIsValid(companyName.trim().length >= 2);
    }, [companyName]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isValid) {
        onContinue(companyName.trim());
      }
    };
  return (
    <div className="flex-grow">
    <Card className="w-[100vw] border-none transition-all duration-300">
      <form onSubmit={handleSubmit} className="">
        <CardHeader className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-100">
            Your Company Name
          </h2>
          <p className="text-slate-400">
            What would you like to name your company? You can change this later
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <Input
              autoFocus
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setIsTouched(true);
              }}
              placeholder="JobHunt, Microsoft, etc."
              className="bg-slate-700 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {isTouched && !isValid && (
              <p className="text-red-400 text-sm animate-pulse">
                Company name must be at least 2 characters
              </p>
            )}
            
            <div className="flex items-center justify-between text-slate-400 text-sm">
              <span>{companyName.length}/50</span>
              <span className="transition-opacity duration-200">
                {isValid ? "✓ Valid" : "✗ Invalid"}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="w-full bg-transparent text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-slate-100 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Continue
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
  )
}

export default CreateCompany
