-- Add hospital-specific roles to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'doctor';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'nurse';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'receptionist';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'pharmacist';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'lab_technician';

-- Drop existing overly permissive policies on patients table
DROP POLICY IF EXISTS "Authenticated users can create patients" ON public.patients;
DROP POLICY IF EXISTS "Authenticated users can update patients" ON public.patients;
DROP POLICY IF EXISTS "Authenticated users can view patients" ON public.patients;

-- Create restrictive role-based policies for patients table
-- Only doctors, nurses, receptionists, and admins can view patient records
CREATE POLICY "Medical staff can view patients"
ON public.patients
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'nurse'::app_role) OR
  public.has_role(auth.uid(), 'receptionist'::app_role)
);

-- Only receptionists and admins can register new patients
CREATE POLICY "Receptionists can register patients"
ON public.patients
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'receptionist'::app_role)
);

-- Only medical staff can update patient records
CREATE POLICY "Medical staff can update patients"
ON public.patients
FOR UPDATE
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'nurse'::app_role) OR
  public.has_role(auth.uid(), 'receptionist'::app_role)
);

-- Apply similar restrictions to other sensitive tables
-- Appointments: only medical staff
DROP POLICY IF EXISTS "Authenticated users can manage appointments" ON public.appointments;

CREATE POLICY "Medical staff can view appointments"
ON public.appointments
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'nurse'::app_role) OR
  public.has_role(auth.uid(), 'receptionist'::app_role)
);

CREATE POLICY "Medical staff can create appointments"
ON public.appointments
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'receptionist'::app_role)
);

CREATE POLICY "Medical staff can update appointments"
ON public.appointments
FOR UPDATE
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'receptionist'::app_role)
);

CREATE POLICY "Medical staff can delete appointments"
ON public.appointments
FOR DELETE
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'receptionist'::app_role)
);

-- OPD Consultations: only doctors and nurses
DROP POLICY IF EXISTS "Authenticated users can manage consultations" ON public.opd_consultations;

CREATE POLICY "Medical staff can view consultations"
ON public.opd_consultations
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'nurse'::app_role)
);

CREATE POLICY "Doctors can manage consultations"
ON public.opd_consultations
FOR ALL
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role)
);

-- Vitals: doctors and nurses only
DROP POLICY IF EXISTS "Authenticated users can manage vitals" ON public.vitals;

CREATE POLICY "Medical staff can manage vitals"
ON public.vitals
FOR ALL
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'nurse'::app_role)
);

-- Prescriptions: doctors only (except viewing)
DROP POLICY IF EXISTS "Authenticated users can manage prescriptions" ON public.prescriptions;

CREATE POLICY "Medical staff can view prescriptions"
ON public.prescriptions
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'nurse'::app_role) OR
  public.has_role(auth.uid(), 'pharmacist'::app_role)
);

CREATE POLICY "Doctors can create prescriptions"
ON public.prescriptions
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role)
);

CREATE POLICY "Doctors can update prescriptions"
ON public.prescriptions
FOR UPDATE
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role)
);

-- Lab tests and results: restrict to lab technicians and doctors
DROP POLICY IF EXISTS "Authenticated users can manage lab orders" ON public.lab_orders;
DROP POLICY IF EXISTS "Authenticated users can manage lab results" ON public.lab_results;

CREATE POLICY "Medical staff can view lab orders"
ON public.lab_orders
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'nurse'::app_role) OR
  public.has_role(auth.uid(), 'lab_technician'::app_role)
);

CREATE POLICY "Doctors can create lab orders"
ON public.lab_orders
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role)
);

CREATE POLICY "Medical staff can update lab orders"
ON public.lab_orders
FOR UPDATE
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'lab_technician'::app_role)
);

CREATE POLICY "Lab staff can manage lab results"
ON public.lab_results
FOR ALL
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'lab_technician'::app_role)
);

-- Pharmacy: restrict to pharmacists
DROP POLICY IF EXISTS "Authenticated users can manage pharmacy sales" ON public.pharmacy_sales;
DROP POLICY IF EXISTS "Authenticated users can manage pharmacy sale items" ON public.pharmacy_sale_items;

CREATE POLICY "Pharmacy staff can manage sales"
ON public.pharmacy_sales
FOR ALL
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'pharmacist'::app_role)
);

CREATE POLICY "Pharmacy staff can manage sale items"
ON public.pharmacy_sale_items
FOR ALL
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'pharmacist'::app_role)
);