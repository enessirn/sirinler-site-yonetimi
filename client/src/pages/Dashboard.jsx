import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import Cards from '../components/dashboard/Cards';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router';

function Dashboard() {

    const handleFloatButtonClick = () => {
        window.open('https://forms.gle/m4sBSg8N5XUpZFXeA', '_blank');
    };
    return (
        <div className='w-full min-h-screen bg-gray-50 px-4 py-4'>
            <FloatButton onClick={handleFloatButtonClick} className='!w-12 !h-12 md:!w-18 md:!h-18' icon={<QuestionCircleOutlined />} type="primary" style={{ insetInlineStart: 12, bottom: 70 }} />
            <Navbar />
            <Cards />
            <Outlet />
        </div>
    )
}

export default Dashboard