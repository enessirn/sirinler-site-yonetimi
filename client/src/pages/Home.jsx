import HomeCards from '../layout/HomeCards'
import Transactions from '../layout/Transactions'
import Footer from '../layout/Footer'
import Header from '../layout/Header'

function Home() {
    return (
        <div className='w-full min-h-screen bg-gray-50 px-4 py-4'>
            <Header />
            <HomeCards />
            <Transactions />
            <Footer />
        </div>
    )
}

export default Home