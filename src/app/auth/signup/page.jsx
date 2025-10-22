import { redirect } from 'next/navigation'

export default function SignUpPage() {
  // Redirect to signin page
  redirect('/auth/signin')
}
