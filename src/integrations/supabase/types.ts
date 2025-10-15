export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          created_at: string | null
          created_by: string | null
          department_id: string | null
          doctor_id: string
          id: string
          notes: string | null
          patient_id: string
          reason: string | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          created_at?: string | null
          created_by?: string | null
          department_id?: string | null
          doctor_id: string
          id?: string
          notes?: string | null
          patient_id: string
          reason?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          created_at?: string | null
          created_by?: string | null
          department_id?: string | null
          doctor_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          reason?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      beds: {
        Row: {
          bed_number: string
          created_at: string | null
          id: string
          is_occupied: boolean | null
          ward_id: string | null
        }
        Insert: {
          bed_number: string
          created_at?: string | null
          id?: string
          is_occupied?: boolean | null
          ward_id?: string | null
        }
        Update: {
          bed_number?: string
          created_at?: string | null
          id?: string
          is_occupied?: boolean | null
          ward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "beds_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      bill_items: {
        Row: {
          amount: number
          bill_id: string
          id: string
          item_name: string
          quantity: number | null
          rate: number
        }
        Insert: {
          amount: number
          bill_id: string
          id?: string
          item_name: string
          quantity?: number | null
          rate: number
        }
        Update: {
          amount?: number
          bill_id?: string
          id?: string
          item_name?: string
          quantity?: number | null
          rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "bill_items_bill_id_fkey"
            columns: ["bill_id"]
            isOneToOne: false
            referencedRelation: "bills"
            referencedColumns: ["id"]
          },
        ]
      }
      bills: {
        Row: {
          bill_date: string | null
          bill_number: string
          bill_type: string
          created_at: string | null
          created_by: string | null
          discount: number | null
          id: string
          paid_amount: number | null
          patient_id: string
          payment_mode: Database["public"]["Enums"]["payment_mode"] | null
          status: Database["public"]["Enums"]["bill_status"] | null
          subtotal: number | null
          tax: number | null
          total_amount: number
        }
        Insert: {
          bill_date?: string | null
          bill_number: string
          bill_type: string
          created_at?: string | null
          created_by?: string | null
          discount?: number | null
          id?: string
          paid_amount?: number | null
          patient_id: string
          payment_mode?: Database["public"]["Enums"]["payment_mode"] | null
          status?: Database["public"]["Enums"]["bill_status"] | null
          subtotal?: number | null
          tax?: number | null
          total_amount: number
        }
        Update: {
          bill_date?: string | null
          bill_number?: string
          bill_type?: string
          created_at?: string | null
          created_by?: string | null
          discount?: number | null
          id?: string
          paid_amount?: number | null
          patient_id?: string
          payment_mode?: Database["public"]["Enums"]["payment_mode"] | null
          status?: Database["public"]["Enums"]["bill_status"] | null
          subtotal?: number | null
          tax?: number | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "bills_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      inventory_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      inventory_items: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          item_name: string
          quantity: number | null
          reorder_level: number | null
          unit: string | null
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          item_name: string
          quantity?: number | null
          reorder_level?: number | null
          unit?: string | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          item_name?: string
          quantity?: number | null
          reorder_level?: number | null
          unit?: string | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "inventory_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      ipd_admissions: {
        Row: {
          admission_date: string | null
          admission_type: string | null
          bed_id: string | null
          created_at: string | null
          created_by: string | null
          diagnosis: string | null
          discharge_date: string | null
          doctor_id: string
          id: string
          notes: string | null
          patient_id: string
          status: Database["public"]["Enums"]["admission_status"] | null
        }
        Insert: {
          admission_date?: string | null
          admission_type?: string | null
          bed_id?: string | null
          created_at?: string | null
          created_by?: string | null
          diagnosis?: string | null
          discharge_date?: string | null
          doctor_id: string
          id?: string
          notes?: string | null
          patient_id: string
          status?: Database["public"]["Enums"]["admission_status"] | null
        }
        Update: {
          admission_date?: string | null
          admission_type?: string | null
          bed_id?: string | null
          created_at?: string | null
          created_by?: string | null
          diagnosis?: string | null
          discharge_date?: string | null
          doctor_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          status?: Database["public"]["Enums"]["admission_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "ipd_admissions_bed_id_fkey"
            columns: ["bed_id"]
            isOneToOne: false
            referencedRelation: "beds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ipd_admissions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ipd_admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_orders: {
        Row: {
          created_at: string | null
          created_by: string | null
          doctor_id: string | null
          id: string
          order_date: string | null
          order_number: string
          patient_id: string
          status: string | null
          test_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          doctor_id?: string | null
          id?: string
          order_date?: string | null
          order_number: string
          patient_id: string
          status?: string | null
          test_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          doctor_id?: string | null
          id?: string
          order_date?: string | null
          order_number?: string
          patient_id?: string
          status?: string | null
          test_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_orders_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_orders_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_orders_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "lab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_results: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          remarks: string | null
          result_date: string | null
          result_unit: string | null
          result_value: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          remarks?: string | null
          result_date?: string | null
          result_unit?: string | null
          result_value?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          remarks?: string | null
          result_date?: string | null
          result_unit?: string | null
          result_value?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_results_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "lab_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_results_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_tests: {
        Row: {
          created_at: string | null
          department: string | null
          id: string
          normal_range: string | null
          price: number
          test_code: string | null
          test_name: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id?: string
          normal_range?: string | null
          price: number
          test_code?: string | null
          test_name: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: string
          normal_range?: string | null
          price?: number
          test_code?: string | null
          test_name?: string
        }
        Relationships: []
      }
      opd_consultations: {
        Row: {
          appointment_id: string | null
          chief_complaint: string | null
          consultation_date: string | null
          created_at: string | null
          created_by: string | null
          diagnosis: string | null
          doctor_id: string
          examination: string | null
          history: string | null
          id: string
          notes: string | null
          patient_id: string
        }
        Insert: {
          appointment_id?: string | null
          chief_complaint?: string | null
          consultation_date?: string | null
          created_at?: string | null
          created_by?: string | null
          diagnosis?: string | null
          doctor_id: string
          examination?: string | null
          history?: string | null
          id?: string
          notes?: string | null
          patient_id: string
        }
        Update: {
          appointment_id?: string | null
          chief_complaint?: string | null
          consultation_date?: string | null
          created_at?: string | null
          created_by?: string | null
          diagnosis?: string | null
          doctor_id?: string
          examination?: string | null
          history?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "opd_consultations_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opd_consultations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opd_consultations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          blood_group: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender"]
          id: string
          patient_id: string
          phone: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          blood_group?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender"]
          id?: string
          patient_id: string
          phone: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          blood_group?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          patient_id?: string
          phone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pharmacy_inventory: {
        Row: {
          batch_number: string
          created_at: string | null
          expiry_date: string
          id: string
          manufacturer: string | null
          medicine_name: string
          reorder_level: number | null
          selling_price: number
          stock_quantity: number | null
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          batch_number: string
          created_at?: string | null
          expiry_date: string
          id?: string
          manufacturer?: string | null
          medicine_name: string
          reorder_level?: number | null
          selling_price: number
          stock_quantity?: number | null
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          batch_number?: string
          created_at?: string | null
          expiry_date?: string
          id?: string
          manufacturer?: string | null
          medicine_name?: string
          reorder_level?: number | null
          selling_price?: number
          stock_quantity?: number | null
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      pharmacy_sale_items: {
        Row: {
          amount: number
          id: string
          inventory_id: string
          quantity: number
          rate: number
          sale_id: string
        }
        Insert: {
          amount: number
          id?: string
          inventory_id: string
          quantity: number
          rate: number
          sale_id: string
        }
        Update: {
          amount?: number
          id?: string
          inventory_id?: string
          quantity?: number
          rate?: number
          sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pharmacy_sale_items_inventory_id_fkey"
            columns: ["inventory_id"]
            isOneToOne: false
            referencedRelation: "pharmacy_inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pharmacy_sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "pharmacy_sales"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacy_sales: {
        Row: {
          created_at: string | null
          created_by: string | null
          discount: number | null
          id: string
          patient_id: string | null
          payment_mode: Database["public"]["Enums"]["payment_mode"] | null
          prescription_id: string | null
          sale_date: string | null
          sale_number: string
          subtotal: number | null
          tax: number | null
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          discount?: number | null
          id?: string
          patient_id?: string | null
          payment_mode?: Database["public"]["Enums"]["payment_mode"] | null
          prescription_id?: string | null
          sale_date?: string | null
          sale_number: string
          subtotal?: number | null
          tax?: number | null
          total_amount: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          discount?: number | null
          id?: string
          patient_id?: string | null
          payment_mode?: Database["public"]["Enums"]["payment_mode"] | null
          prescription_id?: string | null
          sale_date?: string | null
          sale_number?: string
          subtotal?: number | null
          tax?: number | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "pharmacy_sales_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pharmacy_sales_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription_items: {
        Row: {
          dosage: string
          duration: string
          frequency: string
          id: string
          instructions: string | null
          medicine_name: string
          prescription_id: string
        }
        Insert: {
          dosage: string
          duration: string
          frequency: string
          id?: string
          instructions?: string | null
          medicine_name: string
          prescription_id: string
        }
        Update: {
          dosage?: string
          duration?: string
          frequency?: string
          id?: string
          instructions?: string | null
          medicine_name?: string
          prescription_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescription_items_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          consultation_id: string
          created_at: string | null
          doctor_id: string
          id: string
          patient_id: string
        }
        Insert: {
          consultation_id: string
          created_at?: string | null
          doctor_id: string
          id?: string
          patient_id: string
        }
        Update: {
          consultation_id?: string
          created_at?: string | null
          doctor_id?: string
          id?: string
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "opd_consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string | null
          department_id: string | null
          designation: string | null
          email: string | null
          employee_id: string
          full_name: string
          id: string
          phone: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          department_id?: string | null
          designation?: string | null
          email?: string | null
          employee_id: string
          full_name: string
          id?: string
          phone?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          department_id?: string | null
          designation?: string | null
          email?: string | null
          employee_id?: string
          full_name?: string
          id?: string
          phone?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visitors: {
        Row: {
          check_in_time: string | null
          check_out_time: string | null
          created_at: string | null
          created_by: string | null
          id: string
          patient_id: string
          purpose: string | null
          visitor_name: string
          visitor_phone: string
        }
        Insert: {
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          patient_id: string
          purpose?: string | null
          visitor_name: string
          visitor_phone: string
        }
        Update: {
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          patient_id?: string
          purpose?: string | null
          visitor_name?: string
          visitor_phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "visitors_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      vitals: {
        Row: {
          blood_pressure: string | null
          consultation_id: string | null
          height: number | null
          id: string
          oxygen_saturation: number | null
          patient_id: string
          pulse: number | null
          recorded_at: string | null
          recorded_by: string | null
          respiratory_rate: number | null
          temperature: number | null
          weight: number | null
        }
        Insert: {
          blood_pressure?: string | null
          consultation_id?: string | null
          height?: number | null
          id?: string
          oxygen_saturation?: number | null
          patient_id: string
          pulse?: number | null
          recorded_at?: string | null
          recorded_by?: string | null
          respiratory_rate?: number | null
          temperature?: number | null
          weight?: number | null
        }
        Update: {
          blood_pressure?: string | null
          consultation_id?: string | null
          height?: number | null
          id?: string
          oxygen_saturation?: number | null
          patient_id?: string
          pulse?: number | null
          recorded_at?: string | null
          recorded_by?: string | null
          respiratory_rate?: number | null
          temperature?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vitals_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "opd_consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vitals_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      wards: {
        Row: {
          created_at: string | null
          floor: string | null
          id: string
          name: string
          total_beds: number | null
          ward_type: string
        }
        Insert: {
          created_at?: string | null
          floor?: string | null
          id?: string
          name: string
          total_beds?: number | null
          ward_type: string
        }
        Update: {
          created_at?: string | null
          floor?: string | null
          id?: string
          name?: string
          total_beds?: number | null
          ward_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      admission_status: "admitted" | "discharged" | "transferred"
      app_role:
        | "admin"
        | "doctor"
        | "nurse"
        | "receptionist"
        | "pharmacist"
        | "lab_technician"
        | "accountant"
      appointment_status: "scheduled" | "completed" | "cancelled" | "no_show"
      bill_status: "pending" | "partial" | "paid" | "cancelled"
      gender: "male" | "female" | "other"
      patient_type: "opd" | "ipd" | "emergency"
      payment_mode: "cash" | "card" | "upi" | "insurance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admission_status: ["admitted", "discharged", "transferred"],
      app_role: [
        "admin",
        "doctor",
        "nurse",
        "receptionist",
        "pharmacist",
        "lab_technician",
        "accountant",
      ],
      appointment_status: ["scheduled", "completed", "cancelled", "no_show"],
      bill_status: ["pending", "partial", "paid", "cancelled"],
      gender: ["male", "female", "other"],
      patient_type: ["opd", "ipd", "emergency"],
      payment_mode: ["cash", "card", "upi", "insurance"],
    },
  },
} as const
