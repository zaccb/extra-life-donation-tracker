import { useState, useEffect } from 'react';
import { getUserInfo } from 'extra-life-api';

import Prism from 'prismjs';

const packageVer = '0.0.0';

const FormBuilder = () => {
    const [ pid, setPid ] = useState('')
    const [ userInfo, setUserInfo ] = useState({});
    const [ showCombinedGoal, setCombinedGoal ] = useState(false);
    const [ showRaised, setShowRaised ] = useState(false)
    const [ showGoal, setShowGoal ] = useState(false);
    const [ showDonationCount, setShowDonationCount ] = useState(false);
    const [ hideBranding, setHideBranding ] = useState(false);
    const [ showCss, setShowCss ] = useState(false);

    const updateUserInfo = userValue => {
        const id = userValue ? userValue : pid;
        getUserInfo(id).then(response => {
            setUserInfo(response);
            console.log(response);
        });
    }

    const dataSelected = () => {
        return showCombinedGoal || showRaised || showGoal || showDonationCount;
    }

    const webRoot = process.env.ENV === 'prod' ? 'https://extra-life-widget.azurewebsites.net/' : 'http://localhost:3000/';

    const getUrl = () => {
       let urlStr = `${webRoot}tracker`
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

    const registerPid = (userValue) => {
        const regExp = new RegExp(/^\d+$/);
        if (regExp.test(userValue) && userValue.length === 6) {
            updateUserInfo(userValue);
        } else {
            setUserInfo({})
        }
    }

    const getCssComment = (selector, scope) => {
        return `${selector} {\n /* put styles for the ${scope} data display here */ \n /* e.g. */ \n /* font-size: 12px; */ \n /* color: white; */\n}\n\n`
    }

    const getStubCSS = () => {
        let cssString = ''
        showCombinedGoal && (cssString += `${getCssComment('.combined-goal', 'combined goal')}`)
        showRaised && (cssString += `${getCssComment('.raised', 'raised')}`)
        showGoal && (cssString += `${getCssComment('.goal', 'goal')}`)
        showDonationCount && (cssString += `${getCssComment('.count', 'donation count')}`)
        return cssString;
    }

    const toggleShowCss = () => {
        setShowCss(!showCss);
    }

    const updatePid = userValue => {
        registerPid(userValue)
        setPid(userValue)
    }

    const clearForm = () => {
        setPid('');
        setUserInfo({});
        setCombinedGoal(false);
        setShowRaised(false);
        setShowGoal(false);
        setShowDonationCount(false);
        setHideBranding(false);
        setShowCss(false); 
    }

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <>
            <main>
                <h1>Extra Life Donation Tracking Data Display Browser Bot (E.L.D.T.D.D.B.B.)</h1>
                <span className="caption">{ packageVer }</span>
                <p>This is a streaming widget that allows you to inject single fragments of data from your Extra Life page into any streaming software that supports custom URLs in a browser source (e.g. OBS studio, Streamlabs OBS, etc.).</p>
                <blockquote>
                    <div>Made with ❤️ by <b>Team Gipsy Danger Zone</b>.</div>
                    <div>If you found this app helpful, consider making a donation to our <a target="_blank" href="https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=50815">team page here. It's for the kids.</a></div>
                </blockquote>

                <div className="form-header">
                    <h3>Customize your data display widget</h3>
                    <button onClick={ clearForm }>Clear</button>
                </div>
                <form>
                    <div className="non-interactive">
                        <label htmlFor="pid">Your participant ID</label>
                        <input type="text" id="pid" value={ pid } onChangeCapture={ evt => updatePid(evt.target.value) }/>
                        {
                            (pid && userInfo && userInfo.displayName) && (
                                <p className="form-success-message">Participant found! Showing data for: { userInfo.displayName }</p>
                            )
                        }
                    </div>

                    <div>
                        <label htmlFor="show-combined-goal">Show combined goal</label>
                        <input type="checkbox" id="show-combined-goal" checked={ showCombinedGoal } onChange={ evt => setCombinedGoal(evt.target.checked) }/>
                    </div>

                    <div>
                        <label htmlFor="show-raised-amt">Show raised amount</label>
                        <input type="checkbox" id="show-raised-amt" checked={ showRaised } onChange={ evt => setShowRaised(evt.target.checked) } />
                    </div>

                    <div>
                        <label htmlFor="show-goal-amt">Show goal amount</label>
                        <input type="checkbox" id="show-goal-amt" checked={ showGoal} onChange={ evt => setShowGoal(evt.target.checked) } />
                    </div>

                    <div>
                        <label htmlFor="show-donation-count">Show donation count</label>
                        <input type="checkbox" id="show-donation-count" checked={ showDonationCount } onChange={ evt => setShowDonationCount(evt.target.checked) }/>
                    </div>

                    <div>
                        <label htmlFor="hide-branding" >Remove Extra Life branding</label>
                        <input type="checkbox" id="hide-branding" checked={ hideBranding } onChange={ evt=> setHideBranding(evt.target.checked) }/>
                    </div>
                </form>

                {
                    dataSelected() && (
                        <div>
                            <h3>Your custom URL</h3>
                            <p>Copy and paste this URL into a <a href="https://medium.com/@plsoid/how-to-add-browser-source-in-obs-streamlabs-obs-twitch-studio-xsplit-50a698080497">browser source in your streaming software.</a>Instructions for adding styling (i.e. customizing CSS) are below.</p>
                            {
                                !userInfo.displayName && (
                                    <blockquote className="warn">Enter a valid participant ID to generate a custom URL.</blockquote>
                                )
                            }
                            {
                                pid && userInfo.displayName && (
                                    <div className="url-playback">
                                        <div className="url">{ getUrl() }</div>
                                        <div className="url-link"><a target="_blank" href={ getUrl() }>Click to test</a></div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }

                {
                    (dataSelected() && pid && userInfo.displayName) && (
                        <div className="preview">
                            <h3>What will be displayed on my stream?</h3>
                            <p>Below is what your will be shown by the browser source in your streaming software.</p>
                            <div className={ hideBranding ? 'data-output' : 'data-output branded' }>
                                {
                                    showCombinedGoal && (
                                        <div>${userInfo.sumDonations}/${userInfo.fundraisingGoal}</div>
                                    )
                                }
                                {
                                    showRaised && (
                                        <div>${userInfo.sumDonations}</div>
                                    )
                                }
                                {
                                    showGoal && (
                                        <div>${userInfo.fundraisingGoal}</div>
                                    )
                                }
                                {
                                    showDonationCount && (
                                        <div>{userInfo.numDonations}</div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }

                {
                    <div className={ showCss ? "css-preview-wrapper" : "css-preview-wrapper collapsed"}>
                        <div className="header">
                            <h3>How do I customize the styling?</h3>
                            <button onClick={ toggleShowCss }>{ showCss ? 'Hide' : 'Show' }</button>
                        </div>
    
                        <div className="css-preview">
                            <p>Copy and paste the below CSS into the <b>Custom CSS</b> field of the browser source in your OBS client. Replace the commented lines (e.g. "/* comment */") with actual CSS rules. Example CSS rules are provided for changing the font size and font color, for example, but all CSS rules are valid.</p>
                            {
                                (!dataSelected() || !userInfo.displayName) && (
                                    <blockquote className="warn">Example CSS will display once the widget is customized.</blockquote>
                                )
                            }
                            <pre><code className="language-css">{ getStubCSS() }</code></pre>
                        </div>
                    </div>
                }
            </main>
        </>
    )
}

export default FormBuilder
