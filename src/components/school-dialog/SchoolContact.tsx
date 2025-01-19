import { MapPin, Phone, MessageSquare } from "lucide-react";

interface SchoolContactProps {
  street: string;
  city: string;
  zipCode: string;
  phone?: string;
  whatsapp?: string;
}

export const SchoolContact = ({ street, city, zipCode, phone, whatsapp }: SchoolContactProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>{street}, {city} {zipCode}</span>
      </div>
      {phone && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4" />
          <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
        </div>
      )}
      {whatsapp && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <MessageSquare className="w-4 h-4" />
          <a 
            href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            WhatsApp
          </a>
        </div>
      )}
    </div>
  );
};