import { useState, useEffect, useRef } from 'react'
import './ChatBot.css'

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: 'Hello! I\'m your symptom checker assistant. Please describe your symptoms and I\'ll try to help you understand them better. Remember, I\'m not a replacement for professional medical advice.',
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const messagesEndRef = useRef(null)
    const recognitionRef = useRef(null)
    const speechSynthesisRef = useRef(null)

    // Hindi symptoms data
    const offlineSymptomsHindi = {
        'सिरदर्द': {
            info: 'सिरदर्द तनाव, निर्जलीकरण, आंखों के तनाव या नींद की कमी के कारण हो सकता है। एक शांत, अंधेरे कमरे में आराम करने और हाइड्रेटेड रहने का प्रयास करें।',
            suggestions: ['अंधेरे कमरे में आराम करें', 'हाइड्रेटेड रहें', 'ठंडा सेक लगाएं', 'ओवर-द-काउंटर दर्द निवारक पर विचार करें']
        },
        'बुखार': {
            info: 'बुखार अक्सर एक संकेत है कि आपका शरीर संक्रमण से लड़ रहा है। अपने तापमान की निगरानी करें और हाइड्रेटेड रहें।',
            suggestions: ['आराम और नींद लें', 'भरपूर तरल पदार्थ पिएं', 'नियमित रूप से तापमान लें', 'यदि बुखार अधिक या लगातार है तो चिकित्सक की सलाह लें']
        },
        'खांसी': {
            info: 'खांसी सूखी या उत्पादक हो सकती है और यह संक्रमण, एलर्जी या जलन के कारण हो सकती है।',
            suggestions: ['हाइड्रेटेड रहें', 'आराम के लिए शहद का उपयोग करें', 'जलन पैदा करने वाली चीजों से बचें', 'यदि लगातार खांसी है तो डॉक्टर से मिलें']
        },
        'गले में खराश': {
            info: 'गले में खराश आमतौर पर वायरल संक्रमण, बैक्टीरियल संक्रमण या जलन के कारण होती है।',
            suggestions: ['गर्म नमक के पानी से गरारे करें', 'हाइड्रेटेड रहें', 'गले की लोज़ेंजेस का उपयोग करें', 'अपनी आवाज़ को आराम दें']
        },
        'मतली': {
            info: 'मतली मोशन सिकनेस, फूड पॉइजनिंग या तनाव सहित विभिन्न कारकों से हो सकती है।',
            suggestions: ['छोटे, हल्के भोजन खाएं', 'छोटे घूंट में हाइड्रेटेड रहें', 'ताज़ी हवा लें', 'आरामदायक स्थिति में आराम करें']
        },
        'चक्कर आना': {
            info: 'चक्कर निर्जलीकरण, आंतरिक कान की समस्याओं या अचानक स्थिति परिवर्तन के कारण हो सकते हैं।',
            suggestions: ['तुरंत बैठ जाएं या लेट जाएं', 'हाइड्रेटेड रहें', 'स्थिति बदलते समय धीरे-धीरे चलें', 'अचानक हरकतों से बचें']
        },
        'थकान': {
            info: 'थकान नींद की कमी, तनाव, खराब आहार या अंतर्निहित स्वास्थ्य स्थितियों के कारण हो सकती है।',
            suggestions: ['पर्याप्त नींद सुनिश्चित करें', 'नियमित नींद का समय बनाए रखें', 'संतुलित भोजन खाएं', 'हल्के व्यायाम पर विचार करें']
        },
        'पेट दर्द': {
            info: 'पेट दर्द के कई कारण हो सकते हैं जिनमें अपच, गैस या अधिक गंभीर स्थितियां शामिल हैं।',
            suggestions: ['मसालेदार या चिकना भोजन से बचें', 'हल्की गर्मी का उपयोग करें', 'हाइड्रेटेड रहें', 'छोटे, लगातार भोजन खाएं']
        }
    }

    // Original English symptoms data
    const offlineSymptomsEnglish = {
        'headache': {
            info: 'Headaches can be caused by stress, dehydration, eye strain, or lack of sleep. Try resting in a quiet, dark room and staying hydrated.',
            suggestions: ['Rest in a dark room', 'Stay hydrated', 'Apply cold compress', 'Consider over-the-counter pain relief']
        },
        'fever': {
            info: 'A fever is often a sign your body is fighting an infection. Monitor your temperature and stay hydrated.',
            suggestions: ['Rest and sleep', 'Drink plenty of fluids', 'Take temperature regularly', 'Seek medical attention if fever is high or persistent']
        },
        'cough': {
            info: 'Coughs can be dry or productive and may be caused by infections, allergies, or irritants.',
            suggestions: ['Stay hydrated', 'Use honey for soothing', 'Avoid irritants', 'Consider seeing a doctor if persistent']
        },
        'sore throat': {
            info: 'Sore throats are commonly caused by viral infections, bacterial infections, or irritation.',
            suggestions: ['Gargle with warm salt water', 'Stay hydrated', 'Use throat lozenges', 'Rest your voice']
        },
        'nausea': {
            info: 'Nausea can be caused by various factors including motion sickness, food poisoning, or stress.',
            suggestions: ['Eat small, bland meals', 'Stay hydrated with small sips', 'Get fresh air', 'Rest in a comfortable position']
        },
        'dizziness': {
            info: 'Dizziness can result from dehydration, inner ear issues, or sudden position changes.',
            suggestions: ['Sit or lie down immediately', 'Stay hydrated', 'Move slowly when changing positions', 'Avoid sudden movements']
        },
        'fatigue': {
            info: 'Fatigue can be caused by lack of sleep, stress, poor diet, or underlying health conditions.',
            suggestions: ['Ensure adequate sleep', 'Maintain regular sleep schedule', 'Eat balanced meals', 'Consider light exercise']
        },
        'stomach pain': {
            info: 'Stomach pain can have many causes including indigestion, gas, or more serious conditions.',
            suggestions: ['Avoid spicy or fatty foods', 'Try gentle heat application', 'Stay hydrated', 'Eat small, frequent meals']
        }
    }

    useEffect(() => {
        const handleOnlineStatus = () => setIsOnline(navigator.onLine)
        window.addEventListener('online', handleOnlineStatus)
        window.addEventListener('offline', handleOnlineStatus)

        // Initialize speech recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = false
            recognitionRef.current.interimResults = false
            recognitionRef.current.lang = 'hi-IN' // Hindi language

            recognitionRef.current.onstart = () => {
                setIsListening(true)
            }

            recognitionRef.current.onend = () => {
                setIsListening(false)
            }

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript
                setInputValue(prev => prev + transcript)
            }

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error)
                setIsListening(false)
            }
        }


        // Initialize speech synthesis
        speechSynthesisRef.current = window.speechSynthesis

        return () => {
            window.removeEventListener('online', handleOnlineStatus)
            window.removeEventListener('offline', handleOnlineStatus)
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
            if (speechSynthesisRef.current) {
                speechSynthesisRef.current.cancel()
            }

            ///////////////////////////////////////////speech end/////////////////////////////////////////////////////////
        }
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const detectLanguage = (text) => {
        // Simple language detection based on Hindi characters
        const hindiRegex = /[\u0900-\u097F]/
        return hindiRegex.test(text) ? 'hindi' : 'english'
    }

    const findSymptomMatch = (input, language) => {
        const lowercaseInput = input.toLowerCase()
        const symptomsData = language === 'hindi' ? offlineSymptomsHindi : offlineSymptomsEnglish

        for (const [symptom, data] of Object.entries(symptomsData)) {
            if (lowercaseInput.includes(symptom.toLowerCase()) ||
                lowercaseInput.includes(symptom.toLowerCase().replace(' ', ''))) {
                return { ...data, language }
            }
        }
        return null
    }



    ////////////////////////////////////////////wikepedia api///////////////////////////////////////////////////

    const searchWikipedia = async (query, language = 'en') => {
        try {
            const wikiLang = language === 'hindi' ? 'hi' : 'en'
            const searchResponse = await fetch(
                `https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
            )

            if (!searchResponse.ok) {
                throw new Error('Wikipedia search failed')
            }

            const data = await searchResponse.json()
            return {
                title: data.title,
                extract: data.extract,
                url: data.content_urls?.desktop?.page
            }
        } catch (error) {
            console.error('Wikipedia API error:', error)
            return null
        }
    }

    ///////////////////////////////////////////////////////speech///////////////////////////////////////////////////

    const speakText = (text, language = 'hindi') => {
        if (!speechSynthesisRef.current) {
            alert('Text-to-speech is not supported in your browser.')
            return
        }

        // Stop any ongoing speech
        speechSynthesisRef.current.cancel()

        const utterance = new SpeechSynthesisUtterance(text)

        // Set language and voice
        utterance.lang = language === 'hindi' ? 'hi-IN' : 'en-US'
        utterance.rate = 0.9 // Slightly slower for better comprehension
        utterance.pitch = 1.0
        utterance.volume = 1.0

        // Try to find a Hindi voice if available
        const voices = speechSynthesisRef.current.getVoices()
        const hindiVoice = voices.find(voice =>
            voice.lang === 'hi-IN' || voice.lang.startsWith('hi')
        )
        const englishVoice = voices.find(voice =>
            voice.lang === 'en-US' || voice.lang.startsWith('en')
        )

        if (language === 'hindi' && hindiVoice) {
            utterance.voice = hindiVoice
        } else if (englishVoice) {
            utterance.voice = englishVoice
        }

        utterance.onstart = () => {
            setIsSpeaking(true)
        }

        utterance.onend = () => {
            setIsSpeaking(false)
        }

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error)
            setIsSpeaking(false)
            alert('Error playing audio. Please try again.')
        }

        speechSynthesisRef.current.speak(utterance)
    }

    const stopSpeaking = () => {
        if (speechSynthesisRef.current) {
            speechSynthesisRef.current.cancel()
            setIsSpeaking(false)
        }
    }
    ////////////////////////////////////////////////////////////////////////speech bnd//////////////////////////////
    const generateBotResponse = async (userMessage) => {
        setIsTyping(true)

        try {
            const language = detectLanguage(userMessage)
            const symptomMatch = findSymptomMatch(userMessage, language)

            if (isOnline) {
                let wikiQuery
                if (language === 'hindi') {
                    wikiQuery = userMessage.toLowerCase().includes('लक्षण')
                        ? userMessage.replace(/लक्षण|लक्षणों/gi, '').trim()
                        : `${userMessage} लक्षण`
                } else {
                    wikiQuery = userMessage.toLowerCase().includes('symptom')
                        ? userMessage.replace(/symptom|symptoms/gi, '').trim()
                        : `${userMessage} symptoms`
                }

                const wikiData = await searchWikipedia(wikiQuery, language)

                if (symptomMatch) {
                    let response = language === 'hindi'
                        ? `आपके लक्षणों के आधार पर, मुझे यह जानकारी मिली:\n\n${symptomMatch.info}\n\n`
                        : `Based on your symptoms, here's what I found:\n\n${symptomMatch.info}\n\n`

                    response += language === 'hindi'
                        ? `**सुझाव:**\n${symptomMatch.suggestions.map(s => `• ${s}`).join('\n')}\n\n`
                        : `**Suggestions:**\n${symptomMatch.suggestions.map(s => `• ${s}`).join('\n')}\n\n`

                    if (wikiData && wikiData.extract) {
                        response += language === 'hindi'
                            ? `**अतिरिक्त जानकारी:**\n${wikiData.extract.substring(0, 300)}...\n\n`
                            : `**Additional Information:**\n${wikiData.extract.substring(0, 300)}...\n\n`

                        if (wikiData.url) {
                            response += language === 'hindi'
                                ? `[विकिपीडिया पर और जानें](${wikiData.url})`
                                : `[Learn more on Wikipedia](${wikiData.url})`
                        }
                    }

                    return response
                } else if (wikiData && wikiData.extract) {
                    return language === 'hindi'
                        ? `मुझे "${wikiData.title}" के बारे में कुछ सामान्य जानकारी मिली:\n\n${wikiData.extract}\n\n**महत्वपूर्ण:** यह सामान्य जानकारी है। कृपया उचित निदान और उपचार के लिए स्वास्थ्य देखभाल पेशेवर से परामर्श लें।\n\n${wikiData.url ? `[विकिपीडिया पर और जानें](${wikiData.url})` : ''}`
                        : `I found some general information about "${wikiData.title}":\n\n${wikiData.extract}\n\n**Important:** This is general information. Please consult a healthcare professional for proper diagnosis and treatment.\n\n${wikiData.url ? `[Learn more on Wikipedia](${wikiData.url})` : ''}`
                }
            }

            // Offline response
            if (symptomMatch) {
                let response = language === 'hindi'
                    ? `आपके लक्षणों के बारे में मेरी जानकारी:\n\n${symptomMatch.info}\n\n`
                    : `Here's what I know about your symptoms:\n\n${symptomMatch.info}\n\n`

                response += language === 'hindi'
                    ? `**सुझाव:**\n${symptomMatch.suggestions.map(s => `• ${s}`).join('\n')}\n\n`
                    : `**Suggestions:**\n${symptomMatch.suggestions.map(s => `• ${s}`).join('\n')}\n\n`

                response += language === 'hindi'
                    ? `**नोट:** वर्तमान में ऑफलाइन - सीमित जानकारी उपलब्ध है।`
                    : `**Note:** Currently offline - limited information available.`

                return response
            }

            // Unknown symptoms
            return language === 'hindi'
                ? `मैं समझता हूं कि आपको कुछ लक्षणों का अनुभव हो रहा है। जबकि मेरे पास आपके द्वारा वर्णित के बारे में विशिष्ट जानकारी नहीं है, यहां कुछ सामान्य सिफारिशें दी गई हैं:\n\n• अपने लक्षणों पर नज़र रखें\n• हाइड्रेटेड रहें\n• पर्याप्त आराम लें\n• ज्ञात ट्रिगर्स से बचें\n• यदि लक्षण बने रहते हैं या बिगड़ते हैं तो स्वास्थ्य देखभाल पेशेवर से परामर्श लें\n\n**महत्वपूर्ण:** मैं पेशेवर चिकित्सा सलाह का विकल्प नहीं हूं। कृपया उचित निदान और उपचार के लिए डॉक्टर से मिलें।`
                : `I understand you're experiencing some symptoms. While I don't have specific information about what you're describing, here are some general recommendations:\n\n• Monitor your symptoms\n• Stay hydrated\n• Get adequate rest\n• Avoid known triggers\n• Consult a healthcare professional if symptoms persist or worsen\n\n**Important:** I'm not a substitute for professional medical advice. Please see a doctor for proper diagnosis and treatment.`

        } finally {
            setIsTyping(false)
        }
    }

    const toggleSpeechRecognition = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.')
            return
        }

        if (isListening) {
            recognitionRef.current.stop()
        } else {
            recognitionRef.current.start()
        }
    }

    ////////////////////////////////////////////////////


    const handleBotMessageSpeak = (messageContent, messageIndex) => {
        const language = detectLanguage(messageContent)

        // Clean the text for speech (remove markdown, links, etc.)
        const cleanText = messageContent
            .replace(/\*\*/g, '') // Remove bold markers
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove link markup, keep text
            .replace(/\n/g, '. ') // Replace newlines with periods
            .replace(/•/g, '') // Remove bullet points

        if (isSpeaking) {
            stopSpeaking()
        } else {
            speakText(cleanText, language)
        }
    }



    //////////////////////////////////////////////////

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return

        const userMessage = {
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')

        const botResponse = await generateBotResponse(inputValue)

        const botMessage = {
            type: 'bot',
            content: botResponse,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, botMessage])
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const formatMessage = (content) => {
        return content.split('\n').map((line, index) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <div key={index} className="message-heading">{line.replace(/\*\*/g, '')}</div>
            }
            if (line.startsWith('• ')) {
                return <div key={index} className="message-bullet">{line}</div>
            }
            if (line.includes('[') && line.includes('](')) {
                const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/)
                if (linkMatch) {
                    return (
                        <div key={index}>
                            <a href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="message-link">
                                {linkMatch[1]}
                            </a>
                        </div>
                    )
                }
            }
            return line ? <div key={index}>{line}</div> : <br key={index} />
        })
    }

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="header-content">
                            <div className="bot-avatar">🏥</div>
                            <div className="header-text">
                                <h3>Symptom Checker</h3>
                                <span className={`status ${isOnline ? 'online' : 'offline'}`}>
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                            </div>
                        </div>
                        <button
                            className="close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.type}`}>
                                <div className="message-content">
                                    {formatMessage(message.content, index)}









                                    {message.type === 'bot' && (
                                        <button
                                            className={`speaker-btn ${isSpeaking ? 'speaking' : ''}`}
                                            onClick={() => handleBotMessageSpeak(message.content, index)}
                                            title={isSpeaking ? "Stop playback" : "Listen to this message"}
                                        >
                                            {isSpeaking ? '⏹️' : '🔊'}
                                        </button>
                                    )}









                                </div>
                                <div className="message-time">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot typing">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input">
                        <div className="input-container">
                            <textarea
                                className='message-input'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Describe your symptoms in English or Hindi..."
                                rows="1"
                            />
                            <button
                                onClick={toggleSpeechRecognition}
                                className={`mic-btn ${isListening ? 'listening' : ''}`}
                                type="button"
                                title="Speak in Hindi"
                            >
                                🎤
                            </button>
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim()}
                                className="send-btn"
                            >
                                ➤
                            </button>
                        </div>
                        <div className="disclaimer">
                            ⚠️ This is not medical advice. Consult a healthcare professional.
                        </div>
                    </div>
                </div>
            )}

            <button
                className={`chat-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle symptom checker chat"
            >
                {isOpen ? '✕' : '🏥'}
            </button>
        </div>
    )
}

export default ChatBot;