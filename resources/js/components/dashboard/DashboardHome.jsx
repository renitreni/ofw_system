import HeroBanner from './HeroBanner';
import NoticeCard from './NoticeCard';

export default function DashboardHome({ setShowRegistration }) {
    return (
        <>
            <HeroBanner setShowRegistration={setShowRegistration} />
            <NoticeCard />
        </>
    );
}
