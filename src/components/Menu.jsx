'use client';

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {sliderLists} from "../../constants/index.js";
import {useRef, useState} from "react";

const Menu = () => {
    const contentRef = useRef();

    const [currIndex, setCurrIndex] = useState(0);

    useGSAP(() => {
        gsap.fromTo('#title', {
            opacity: 0
        }, {
            opacity: 1,
            duration: 1
        });

        gsap.fromTo('.cocktail img', {
            opacity: 0,
            xPercent: -100
        }, {
            opacity: 1,
            duration: 1,
            xPercent: 0,
            ease: 'power1.inOut'
        })

        gsap.fromTo('.details h2', {
            opacity: 0,
            yPercent: 100
        }, {
            opacity: 100,
            ease: 'power1.inOut',
            yPercent: 0
        });
        gsap.fromTo('.details p', {
            opacity: 0,
            yPercent: 100
        }, {
            opacity: 100,
            ease: 'power1.inOut',
            yPercent: 0
        });

        const parallax = gsap.timeline({
            scrollTrigger: {
                trigger: '#menu',
                start: 'top 30%',
                end: 'bottom 80%',
                scrub: true,
            }
        })

        parallax
            .from('#m-left-leaf', {
                x: -100,
                y: 100
            })
            .from('m-right-leaf', {
                x: 100,
                y: 100
            })

    }, [currIndex])

    const totalCocktails = sliderLists.length;

    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrIndex(newIndex);
    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currIndex + indexOffset + totalCocktails) % totalCocktails];
    }

    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

    return (
        <section id="menu" aria-labelledby="menu-heading">
            <img
                src="/images/slider-left-leaf.png"
                alt="left-leaf"
                id="m-left-leaf"
            />
            <img
                src="/images/slider-right-leaf.png"
                alt="right-leaf"
                id="m-right-leaf"
            />
            <h2 id="menu-heading" className="sr-only">
                Cocktail Menu
            </h2>

            <nav className="cocktail-tabs" aria-label="Cocktail-navigation">
                {sliderLists.map((cocktail, index) => {
                    const isActive = index === currIndex;

                    return (
                        <button
                            key={cocktail.id}
                            className={`
                                ${isActive 
                                ? 'text-white border-white' 
                                : 'text-white/50 border-white/50'}`}
                            onClick={() => goToSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>

            <div className="content">
                <div className="arrows">
                    <button className="text-left" onClick={() => goToSlide(currIndex - 1)}>
                        <span>{prevCocktail.name}</span>
                        <img
                            src="/images/right-arrow.png"
                            alt="right-arrow"
                            aria-hidden="true"
                        />
                    </button>
                    <button className="text-left" onClick={() => goToSlide(currIndex + 1)}>
                        <span>{nextCocktail.name}</span>
                        <img
                            src="/images/left-arrow.png"
                            alt="left-arrow"
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <div className="cocktail">
                    <img
                        src={currentCocktail.image}
                        alt="cocktail"
                        className="object-contain"
                    />
                </div>

                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>
                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Menu
