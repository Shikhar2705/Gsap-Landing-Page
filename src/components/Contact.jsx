import {openingHours, socials} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Contact = () => {
    useGSAP(() => {
        const titleSplit = SplitText.create('#contact h2', {
            type: 'words'
        });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center',
            },
            ease: 'power1.inOut'
        });

        timeline
            .from(titleSplit.words, {
                opacity: 0,
                yPercent: 100,
                stagger: 0.02,

            })
            .from('#contact h3, #contact p', {
                opactiy: 0,
                yPercent: 100,
                stagger: 0.02,
            })
            .to('#f-right-leaf', {
                y: '-50',
                duration: 1,
                ease: 'power1.inOut',
            })
            .to('#f-left-leaf', {
                y: '-50',
                duration: 1,
                ease: 'power1.inOut',
            }, '<')
    })

    return (
        <footer id="contact">
            <img
                src="/images/footer-right-leaf.png"
                alt="leaf-right"
                id="f-right-leaf"
            />
            <img
                src="/images/footer-left-leaf.png"
                alt="leaf-left"
                id="f-left-leaf"
            />

            <div className="content">
                <h2>Where to find Us</h2>

                <div>
                    <h3>Visit our Bar</h3>
                    <p>Crimson Lounge 8427 Sunset Crest Blvd Los Angeles, CA 90046</p>
                </div>

                <div>
                    <h3>Contact Us</h3>
                    <p>(323) 555-0198</p>
                    <p>crimsonlounge.la@gmail.com</p>
                </div>

                <div>
                    <h3>Open Every Day</h3>
                    {openingHours.map(({day, time}, index) => (
                        <p key={index}>{day} : {time}</p>
                    ))}
                </div>

                <div>
                    <h3>Socials</h3>

                    <div className="flex-center gap-5">
                        {socials.map(({name, icon, url}) => (
                            <a
                                key={name}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={name}
                            >
                                <img src={icon} alt={name}/>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Contact
