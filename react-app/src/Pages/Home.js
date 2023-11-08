import React, {
  Suspense
} from 'react'
import NewGame from '../Components/NewGames'
 import SearchComponent from '../Components/SearchComponent'
 import { useLoaderData,
  Form,
  useNavigation,
  redirect,
  defer,
  Await,
  useActionData } from 'react-router-dom'
import { useFetch,getGame} from '../useFetch'
import Loader from '../Components/Loader'


export function loader() {
window.scrollTo(0,0)
return defer({game:getGame(12)})
}

export async function action({params,request}) {
  const formData = await request.formData()
  const result = formData.get('query')
  if(result.trim().length > 0) {
  return redirect(`/search?result=${result}`)
  }
  return 'Input a value'
}
function Home() {
  const data = useLoaderData()
  const message = useActionData()
  const navigation = useNavigation()
  return (
    <>
    <Suspense fallback={<Loader />}>
      <div className='message'>{message}</div>
     <Await resolve={data.game}>
     {() =>  <NewGame />}
     </Await>
    </Suspense>
    </>   
  )
}

export default Home
