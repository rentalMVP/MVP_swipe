import { useRouter } from 'next/router'
import RentalOwner from '../components/rentalOwner/rentalOwner'
export default function RentalOwnersPage() {
    const router = useRouter()
    const { query } = router.query;
  return (
    <>
     {query && <RentalOwner id={query}/>}
    </>
  )
}