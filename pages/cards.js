import { useRouter } from 'next/router'
import Detail from '../components/details/detail' 
export default function CardsPage() {
    const router = useRouter()
    const { query } = router.query;
  return (
    <>
    {query && <Detail id={query}/>}
    </>
  )
}