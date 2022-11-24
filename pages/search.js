
import { useRouter } from 'next/router'
import Search from '../components/search/search'
export default function SearchPage() {
  const router = useRouter()
  const { query } = router.query;
  return (
    <>
      {query && <Search queryText={query} />}
    </>
  )
}


// export async function getStaticProps() {
//   return {
//     props: {}
//   }
// }
