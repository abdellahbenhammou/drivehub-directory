export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
        }
        Insert: {
          created_at?: string | null
          email: string
        }
        Update: {
          created_at?: string | null
          email?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          city: string
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          password: string
          phone: string
          updated_at: string | null
        }
        Insert: {
          city: string
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          password: string
          phone: string
          updated_at?: string | null
        }
        Update: {
          city?: string
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          password?: string
          phone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      instructors: {
        Row: {
          created_at: string | null
          gender: string | null
          id: string
          is_verified: boolean | null
          name: string
          profile_image: string | null
          rating: number | null
          school_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          gender?: string | null
          id?: string
          is_verified?: boolean | null
          name: string
          profile_image?: string | null
          rating?: number | null
          school_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          gender?: string | null
          id?: string
          is_verified?: boolean | null
          name?: string
          profile_image?: string | null
          rating?: number | null
          school_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instructors_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      school_ownership_requests: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          id: string
          school_id: string
          status: Database["public"]["Enums"]["request_status"] | null
          updated_at: string | null
          user_email: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          school_id: string
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
          user_email: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          school_id?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_ownership_requests_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          city: string | null
          created_at: string | null
          driving_classes: boolean | null
          driving_price: number | null
          id: string
          image_url: string
          latitude: number | null
          location: string
          longitude: number | null
          name: string
          owner_email: string | null
          phone: string | null
          price_per_hour: number | null
          rating: number
          reviews: number
          safety_courses: boolean | null
          safety_price: number | null
          street: string | null
          theory_classes: boolean | null
          theory_price: number | null
          updated_at: string | null
          whatsapp: string | null
          zip_code: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          driving_classes?: boolean | null
          driving_price?: number | null
          id?: string
          image_url: string
          latitude?: number | null
          location: string
          longitude?: number | null
          name: string
          owner_email?: string | null
          phone?: string | null
          price_per_hour?: number | null
          rating: number
          reviews: number
          safety_courses?: boolean | null
          safety_price?: number | null
          street?: string | null
          theory_classes?: boolean | null
          theory_price?: number | null
          updated_at?: string | null
          whatsapp?: string | null
          zip_code?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          driving_classes?: boolean | null
          driving_price?: number | null
          id?: string
          image_url?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          name?: string
          owner_email?: string | null
          phone?: string | null
          price_per_hour?: number | null
          rating?: number
          reviews?: number
          safety_courses?: boolean | null
          safety_price?: number | null
          street?: string | null
          theory_classes?: boolean | null
          theory_price?: number | null
          updated_at?: string | null
          whatsapp?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      request_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
