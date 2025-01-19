import { Card } from "@/components/ui/card";

interface SchoolServicesProps {
  theoryClasses?: boolean;
  theoryPrice?: number;
  drivingClasses?: boolean;
  drivingPrice?: number;
  safetyCourses?: boolean;
  safetyPrice?: number;
}

export const SchoolServices = ({ 
  theoryClasses, 
  theoryPrice, 
  drivingClasses, 
  drivingPrice, 
  safetyCourses, 
  safetyPrice 
}: SchoolServicesProps) => {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} MAD`;
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {theoryClasses && (
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Theory Classes</h3>
          <p className="text-muted-foreground">{formatPrice(theoryPrice || 0)}/course</p>
        </Card>
      )}
      {drivingClasses && (
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Driving Classes</h3>
          <p className="text-muted-foreground">{formatPrice(drivingPrice || 0)}/hr</p>
        </Card>
      )}
      {safetyCourses && (
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Safety Courses</h3>
          <p className="text-muted-foreground">{formatPrice(safetyPrice || 0)}/course</p>
        </Card>
      )}
    </div>
  );
};