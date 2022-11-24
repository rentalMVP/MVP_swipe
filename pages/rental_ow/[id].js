
import { useRouter } from 'next/router'
import RentalOwner from '../../components/rentalOwner/rentalOwner'
export default function RentalOwnersPage() {
    const router = useRouter()
    const { id } = router.query;
  return (
    <>
     {id && <RentalOwner id={id}/>}
    </>
  )
}
