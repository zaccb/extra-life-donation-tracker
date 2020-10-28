import commaNumber from 'comma-number';

const UserInfoDisplay = props => {
    const { userInfo, hideBranding, showCombinedGoal, showRaised, showGoal, showDonationCount } = props;

    return (
        <div className={ hideBranding ? 'data-output' : 'data-output branded' }>
            {
                showCombinedGoal && (
                    <div>${commaNumber(userInfo.sumDonations)} / ${commaNumber(userInfo.fundraisingGoal)}</div>
                )
            }
            {
                showRaised && (
                    <div>${commaNumber(userInfo.sumDonations)}</div>
                )
            }
            {
                showGoal && (
                    <div>${commaNumber(userInfo.fundraisingGoal)}</div>
                )
            }
            {
                showDonationCount && (
                    <div>{commaNumber(userInfo.numDonations)}</div>
                )
            }
        </div>
    )
}

export default UserInfoDisplay;