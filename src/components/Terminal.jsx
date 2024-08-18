import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { TerminalSquare } from "lucide-react";
import Wheel from "./Spinner";

const HelpCommand = () => (
    <div className="mt-2">
        <h1 className="text-sm font-medium opacity-70">Available commands:</h1>
        <ul className="text-sm font-mono font-semibold tracking-wide flex flex-col gap-2">
            <li className="mt-2 flex gap-2 items-center">
                pranav: <span className="opacity-70 text-xs">Displays a brief info about me</span>
            </li>
            <li className="mt-2 flex gap-2 items-center">
                echo: <span className="opacity-70 text-xs">Prints whatever is written after echo</span>
            </li>
            {/* <li className="flex items-center gap-2">
                proj: <span className="opacity-70 text-xs">Navigates to project page</span>
            </li> */}
            <li className="flex items-center gap-2">
                projects: <span className="opacity-70 text-xs">Lists all my projects</span>
            </li>
            <li className="flex items-center gap-2">
                about: <span className="opacity-70 text-xs">Displays a brief about myself and my hobbies</span>
            </li>
            <li className="flex items-center gap-2">
                skills <span className="opacity-70 text-xs">Displays little bit of what i can</span>
            </li>
            <li className="flex items-center gap-2">
                contacts <span className="opacity-70 text-xs">Some of ways to contact me</span>
            </li>
            
            <li className="flex items-center gap-2">
                clear: <span className="opacity-70 text-xs">Clears terminal</span>
            </li>
        </ul>
    </div>
);

const Terminalcomp = () => {
    const [input, setInput] = useState("");
    const [commands, setCommands] = useState([]);
    const terminalRef = useRef(null);

    const getFormattedTime = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const amPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes}:${seconds}${amPm}`;
    };

    const [currentTime, setCurrentTime] = useState(getFormattedTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleInputChange = (e) => setInput(e.target.value);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") processCommand(e);
    };

    const processCommand = (e) => {
        e.preventDefault();
        const command = input.trim().toLowerCase();
        let output;

        switch (command) {
            case "hello":
                output = "Yahallo! how can I help you??";
                break;
            case "raj":
                output = "";
                window.location.href = "https://www.youtube.com/shorts/u2O1g-BEZuo";
                break;
            case "sudo":
                output = "missing parameters";
                break;
            case "ls -a":
            case "ls":
                output = ".open_me";
                break;
            case "cat .open_me":
                window.location.href = "https://www.youtube.com/watch?v=hf1DkBQRQj4";
                output = "";
                break;
            case "pranav":
                output = "Hello there! I am Pranav, a Full Stack Developer experienced in the MERN stack, currently pursuing my Bachelor's in Computer Science and Engineering. Type 'about' to know more about me";
                break;
            case "neofetch":
                window.location.href = "https://www.youtube.com/watch?v=Rl1ImG2b1k8&t=51s";
                output = "";
                break;
            case "about":
                // output = <Wheel />
                output = "I am Pranav, currently pursuing B.E in computer science from chandigarh university.";
                break;
            case "blogs":
                output = "Navigate to blogs page.";
                break;
            case "proj":
                output = "Navigate to projects page.";
                break;
            case "project":
                output = "did you mean 'projects'?";
                break;
            case "contact":
                output = "did you mean 'contacts'?";
                break;
            case "skill":
                output = "did you mean 'skills'?";
                break;
            case "projects":
                output = (
                    <ul>
                        <li>TeamFinder</li>
                        <li>Spotify-telegram-bot</li>
                        <li>QuizApp</li>
                        <li>ElecTrade</li>
                    </ul>
                );
                break;
            case "help":
                output = <HelpCommand />;
                break;
            case "TeamFinder":
                window.location.href = "https://github.com/Teamfinder";
                output = "";
                break;
            case "spotify-telegram-bot":
                window.location.href = "https://github.com/Pranav322/spotify-telegram-bot";
                output = "";
                break;
            case "QuizApp":
                window.location.href = "https://github.com/Pranav322/QuizApp";
                output = "";
                break;
            case "ElecTrade":
                window.location.href = "https://github.com/Pranav322/ElecTrade";
                output = "";
                break;
            case "github":
                window.location.href = "https://github.com/Pranav322";
                output = "";
                break;
            case "skills":
                output = (
                    <ul>
                        <li>React</li>
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>MongoDB</li>
                        <li>Python</li>
                        <li>Django</li>
                        </ul>
                )
                break;
            case "contacts":
                output = (
                    <ul>
                        <li>Email:duckieduckk@duck.com(riyal hai)</li>
                        <li>Phone: nahi bataunga</li>
                        <li>Address: nahi bataunga</li>
                        </ul>
                )
                break;

            case "clear":
                setCommands([]);
                output = "Terminal cleared.";
                break;
            
            default:
                if (command.startsWith("echo ")) {
                    output = command.substring(5);
                } else if (command.startsWith("rm")) {
                    window.location.href = "https://www.youtube.com/watch?v=AlLhMySQTlo";
                    output = "";
                } else if (command.includes("apt")) {
                    output = "You are a reliable person";
                } else if (command.includes("pacman")) {
                    output = "certified racist and a virgin (likes to go fast)";
                } else if (command.includes("dnf")) {
                    output = "gets the job done slowly but surely";
                } else if (/^\d+[+\-*/]\d+$/.test(command)) {
                    try {
                        output = eval(command);
                    } catch (error) {
                        output = "Error in evaluating the expression.";
                    }
                } else {
                    output = `Cannot find command: ${command}. Type 'help' for more info.`;
                }
                break;
        }

        const newCommand = {
            id: Date.now(),
            input,
            time: getFormattedTime(),
            output,
        };

        setCommands((prevCommands) => [...prevCommands, newCommand]);
        setInput("");
    };

    useEffect(() => {
        terminalRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [commands]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="border-2 border-black/30 dark:border-white/30 rounded-lg h-[450px] w-[600px] bg-gray-900 p-4 overflow-y-auto">
                <div className="flex justify-between mb-5 items-center sticky top-0 dark:bg-black/40 z-20 backdrop-blur-lg bg-white/40 p-2 rounded">
                    <div className="flex gap-2">
                        <div
                            className="w-3 h-3 duration-200 cursor-pointer bg-red-500 rounded-full"
                            onClick={() => (window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                        ></div>
                        <div className="w-3 h-3 duration-200 cursor-pointer bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 cursor-pointer duration-200 bg-green-500 rounded-full"></div>
                    </div>
                    <h1 className="text-white">pranaw.vercel.app</h1>
                    <span className="border flex gap-1 font-medium text-sm border-white/30 rounded-lg p-2 justify-center items-center text-white">
                        <TerminalSquare size={17} />
                        zsh
                    </span>
                </div>
                <div className="p-2 text-white">
                    <h1 className="text-sm font-medium opacity-70 tracking-wide">Get started by typing `help` command below</h1>
                    
                    <h3 className="text-sm font-light mt-2 opacity-60 italic">use any of the navlinks for some info about them</h3>
                    <h3 className="text-sm font-light mt-2 opacity-60 italic">Escape the matrix</h3>

                    <br />
                    <span className="italic mb-3 text-xs font-medium opacity-60">Tip: Type any of my project names to navigate to their respective github links</span>

                    {commands.map((command) => (
                        <div
                            ref={terminalRef}
                            key={command.id}
                            className="mt-2 font-mono flex justify-between overflow-x-auto"
                            suppressHydrationWarning
                        >
                            <div className="w-full">
                                <div className="text-md font-medium opacity-70 flex items-center gap-3 w-full">
                                    <span className="text-green-500 font-bold text-2xl">{">"}</span> {command.input}
                                </div>
                                <span className="text-sm w-full font-medium opacity-70">{command.output}</span>
                            </div>
                            <span className="text-sm opacity-60">{command.time}</span>
                        </div>
                    ))}
                    <div className="flex font-mono justify-between items-center text-md">
                        <form className="w-full flex items-center gap-3">
                            <span className="text-2xl font-bold">{">"}</span>
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                                className="bg-transparent w-[90%] outline-none border-none focus:outline-none text-white"
                            />
                        </form>
                        <span className="text-sm opacity-60">{currentTime}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminalcomp;
