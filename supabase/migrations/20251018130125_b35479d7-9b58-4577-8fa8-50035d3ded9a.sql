-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can update beds" ON public.beds;

-- Create restrictive policy for UPDATE - only nurses and admins
CREATE POLICY "Only nurses and admins can update beds"
ON public.beds
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'nurse')
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'nurse')
);