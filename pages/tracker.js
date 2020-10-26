
import { getUserInfo } from 'extra-life-api';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// const participantID = 416085;
const pollingRate = 60000;

const Tracker = () => {
    const router = useRouter();
    console.log(router.query);

    const [ pid, setPid ] = useState(router.query.pid)
    const [ userInfo, setUserInfo ] = useState({});
    const [ throttle, setThrottle ] = useState(false);

    useEffect(() => {
        if (throttle) {
            return;
        }

        getUserInfo(pid).then(response => {
            console.log(response);
            setUserInfo(response);
            setThrottle(true)
            setTimeout(() => {
                setThrottle(false);
            }, pollingRate)
        });
    }, [ throttle ]);

    return (
        <div className={ router.query.hideBranding ? 'data-output' : 'data-output branded' }>
            {
                pid && (
                    <>
                        {
                            router.query.showCombinedGoal && (
                                <>
                                    <span className="raised">${userInfo.sumDonations}</span>
                                    <span>/</span>
                                    <span className="goal">${userInfo.fundraisingGoal}</span>
                                </>
                            )
                        }
                        {
                            router.query.showRaised && (
                                <div className="raised">${userInfo.sumDonations}</div>
                            )
                        }
                        {
                            router.query.showGoal && (
                                <div className="goal">${userInfo.fundraisingGoal}</div>
                            )
                        }
                        {
                            router.query.showDonationCount && (
                                <div className="count">{userInfo.numDonations}</div>
                            )
                        }
                    </>
                )
            }
            {
                !pid && (
                    <div>Cannot display data without participant ID.</div>
                )
            }
        </div>
    )
}

export default Tracker
