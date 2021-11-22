import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react'
import Loading from "./components/common/Loading";

const Home = lazy(() => import('./components/views/Home'))
const Collection = lazy(() => import('./components/views/Collection'))

export default function Router () {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </Suspense>
  )
}