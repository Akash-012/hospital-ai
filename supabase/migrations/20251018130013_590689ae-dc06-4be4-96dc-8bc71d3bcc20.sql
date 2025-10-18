-- Create security definer function to check if user can view a specific patient
CREATE OR REPLACE FUNCTION public.can_view_patient(_user_id uuid, _patient_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    -- Admins can view all patients
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id AND role = 'admin'
  ) OR EXISTS (
    -- Doctors can view patients they have appointments with
    SELECT 1 FROM public.appointments 
    WHERE doctor_id = _user_id AND patient_id = _patient_id
  ) OR EXISTS (
    -- Doctors can view patients they have consultations with
    SELECT 1 FROM public.opd_consultations 
    WHERE doctor_id = _user_id AND patient_id = _patient_id
  ) OR EXISTS (
    -- Doctors can view patients they admitted to IPD
    SELECT 1 FROM public.ipd_admissions 
    WHERE doctor_id = _user_id AND patient_id = _patient_id
  ) OR EXISTS (
    -- Nurses can view patients whose vitals they recorded
    SELECT 1 FROM public.vitals 
    WHERE recorded_by = _user_id AND patient_id = _patient_id
  ) OR EXISTS (
    -- Receptionists/staff who created the patient record can view it
    SELECT 1 FROM public.patients 
    WHERE id = _patient_id 
    AND id IN (
      SELECT patient_id FROM public.appointments WHERE created_by = _user_id
      UNION
      SELECT patient_id FROM public.opd_consultations WHERE created_by = _user_id
      UNION
      SELECT patient_id FROM public.ipd_admissions WHERE created_by = _user_id
    )
  );
$$;

-- Drop the old overly permissive policy
DROP POLICY IF EXISTS "Medical staff can view patients" ON public.patients;

-- Create new restrictive policy for SELECT
CREATE POLICY "Staff can view patients they are treating or managing"
ON public.patients
FOR SELECT
TO authenticated
USING (
  public.can_view_patient(auth.uid(), id)
);

-- Keep UPDATE policy restrictive to medical staff roles only
-- (already exists, just ensuring it's correct)