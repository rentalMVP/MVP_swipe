
import { useRouter } from 'next/router'
import Detail from '../../components/details/detail' 
export default function CardsPage() {
    const router = useRouter()
    const { id } = router.query;
  return (
    <>
    {id && <Detail id={id}/>}
    </>
  )
}