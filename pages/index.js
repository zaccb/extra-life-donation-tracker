import { useState } from 'react';
import { getURL } from 'next/dist/next-server/lib/utils';

const packageVer = '0.0.0';

const HomePage = () => {
    const [ pid, setPid ] = useState(null)
    const [ showCombinedGoal, setCombinedGoal ] = useState(false);
    const [ showRaised, setShowRaised ] = useState(false)
    const [ showGoal, setShowGoal ] = useState(false);
    const [ showDonationCount, setShowDonationCount ] = useState(false);
    const [ hideBranding, setHideBranding ] = useState(false);

    const dataSelected = () => {
        return showCombinedGoal || showRaised || showGoal || showDonationCount;
    }

    const webRoot = 'https://extra-life-widget.azurewebsites.net/';
    // const webRoot = 'http://localhost:3000'

    const getUrl = () => {
       let urlStr = `${webRoot}tracker/`
       const params = []
       pid && params.push(`pid=${pid}`)
       showCombinedGoal && params.push('showCombinedGoal=1')
       showRaised && params.push('showRaised=1')
       showGoal && params.push('showGoal=1')
       showDonationCount && params.push('showDonationCount=1')
       hideBranding && params.push('hideBranding=1')
    
       if (params.length > 0) {
           return urlStr + "?" + params.join("&")
       }
    }

    const sanitizePid = userValue => {
        const regExp = /^\d+$/;
        if (regExp.test(userValue)) {
            setPid(userValue)
        } else {
            setPid(null)
        }
    }

    return (
        <main>
            <h1>Extra Life Donation Tracking Data Display Browser Bot (E.L.D.T.D.D.B.B.)</h1>
            <caption>{ packageVer }</caption>
            <blockquote>
                <div>Made with ❤️ by <b>Team Gipsy Danger Zone</b>.</div>
                <div>Consider making a donation to our <a target="_blank" href="https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=50815">team page here. It's for the kids.</a></div>
            </blockquote>

            <h3>Customize your data display widget</h3>
            <form>
                <div className="non-interactive">
                    <label htmlFor="pid">Your participant ID</label>
                    <input type="text" id="pid" defaultValue={ pid } onChange={ evt => sanitizePid(evt.target.value) } />
                </div>

                <div>
                    <label htmlFor="show-combined-goal">Show combined goal</label>
                    <input type="checkbox" id="show-combined-goal" defaultChecked={ showCombinedGoal } onChange={ evt => setCombinedGoal(evt.target.checked) }/>
                </div>

                <div>
                    <label htmlFor="show-raised-amt">Show raised amount</label>
                    <input type="checkbox" id="show-raised-amt" defaultChecked={ showRaised } onChange={ evt => setShowRaised(evt.target.checked) } />
                </div>

                <div>
                    <label htmlFor="show-goal-amt">Show goal amount</label>
                    <input type="checkbox" id="show-goal-amt" defaultChecked={ showGoal} onChange={ evt => setShowGoal(evt.target.checked) } />
                </div>

                <div>
                    <label htmlFor="show-donation-count">Show donation count</label>
                    <input type="checkbox" id="show-donation-count" defaultChecked={ showDonationCount } onChange={ evt => setShowDonationCount(evt.target.checked) }/>
                </div>

                <div>
                    <label htmlFor="hide-branding" >Remove Extra Life branding</label>
                    <input type="checkbox" id="hide-branding" defaultChecked={ hideBranding } onChange={ evt=> setHideBranding(evt.target.checked) }/>
                </div>
            </form>

            <div className="preview">
                <h3>Preview of the data your URL will generate:</h3>
                <div className={ hideBranding ? 'data-output' : 'data-output branded' }>
                    {
                        showCombinedGoal && (
                            <div>$42/$10,000</div>
                        )
                    }
                    {
                        showRaised && (
                            <div>$42</div>
                        )
                    }
                    {
                        showGoal && (
                            <div>$10,000</div>
                        )
                    }
                    {
                        showDonationCount && (
                            <div>1</div>
                        )
                    }
                </div>
            </div>

            <div>
                <h3>Your custom URL</h3>
                <p>Copy and paste this URL into a <a href="https://medium.com/@plsoid/how-to-add-browser-source-in-obs-streamlabs-obs-twitch-studio-xsplit-50a698080497">browser source in your streaming software.</a>To change text color, size, or other styling on the data display elements, inpect the classes on the HTML elements and add custom CSS directly from your streaming platform browser source.</p>
                {
                    !pid && (
                        <blockquote className="warn">Enter your participant ID to generate a custom URL.</blockquote>
                    )
                }
                {
                    pid && (
                        <div className="url-playback">
                            <div className="url">{ getUrl() }</div>
                            <div className="url-link"><a target="_blank" href={ getUrl() }>Click to test</a></div>
                        </div>
                    )
                }
            </div>

        </main>
    )
}

export default HomePage
