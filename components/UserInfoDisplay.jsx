import commaNumber from 'comma-number';

const UserInfoDisplay = props => {
    const { userInfo, hideBranding, showCombinedGoal, showRaised, showGoal, showDonationCount } = props;

    return (
        <div className={ hideBranding ? 'data-output' : 'data-output branded' }>
            {
                showCombinedGoal && (
                    <div className="combined-goal">${commaNumber(userInfo.sumDonations)} / ${commaNumber(userInfo.fundraisingGoal)}</div>
                )
            }
            {
                showRaised && (
                    <div className="raised">${commaNumber(userInfo.sumDonations)}</div>
                )
            }
            {
                showGoal && (
                    <div className="goal">${commaNumber(userInfo.fundraisingGoal)}</div>
                )
            }
            {
                showDonationCount && (
                    <div className="count">{commaNumber(userInfo.numDonations)}</div>
                )
            }
        </div>
    )
}

export default UserInfoDisplay;