import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getFeedBack, getFeedBackDetail, sendFeedBack } from "../../api/FeedBackApi";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { Mail } from "lucide-react";

const Feedback = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchFeedback(currentPage);
    }, [currentPage]);

    const fetchFeedback = async (page) => {
        try {
            const response = await getFeedBack(page);
            if (response?.data) {
                setFeedbackList(Array.isArray(response.data.elementList) ? response.data.elementList : []);
                setTotalPages(response.data.totalPages);
            } else {
                setFeedbackList([]);
                setTotalPages(1);
            }
        } catch (error) {
            setErrorMessage("Error fetching feedback. Please try again.");
            console.error("Error fetching feedback:", error);
            setFeedbackList([]);
            setTotalPages(1);
        }
    };

    const handleSelectFeedback = async (id) => {
        try {
            const response = await getFeedBackDetail(id);
            if (response?.data) {
                setSelectedFeedback(response.data);
            }
        } catch (error) {
            console.error("Error fetching feedback details:", error);
        }
    };

    const handleSendReply = async () => {
        if (selectedFeedback && replyMessage.trim()) {
            try {
                await sendFeedBack(replyMessage, selectedFeedback.id);
                setReplyMessage("");
                setSelectedFeedback(prev => ({
                    ...prev,
                    messages: [...prev.messages, { message: replyMessage, role: 'ADMIN', createdAt: new Date() }]
                }));
            } catch (error) {
                console.error("Error sending reply:", error);
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col relative">
                <Header />
                <div className="grid grid-cols-4 gap-4 p-4">
                    <motion.div
                        className="col-span-1 border-r p-4 bg-white rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-lg font-semibold mb-4">User Feedback</h2>
                        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                        <ul>
                            {feedbackList.length > 0 ? (
                                feedbackList.map((feedback) => (
                                    <motion.li
                                        key={feedback.id}
                                        className="p-3 border-b cursor-pointer hover:bg-gray-200 transition-all rounded-lg flex items-center gap-2"
                                        onClick={() => handleSelectFeedback(feedback.id)}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Mail className="text-blue-500" /> {feedback.message}
                                    </motion.li>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No feedback available</p>
                            )}
                        </ul>
                        <div className="flex justify-between mt-4">
                            <Button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                                disabled={currentPage === 0}
                            >
                                Previous
                            </Button>
                            <span className="text-gray-700">Page {currentPage + 1} / {totalPages}</span>
                            <Button
                                onClick={() => setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))}
                                disabled={currentPage >= totalPages - 1}
                            >
                                Next
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="col-span-3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {selectedFeedback ? (
                            <Card className="p-6 shadow-lg bg-white rounded-lg">
                                <CardHeader className="text-xl font-bold">
                                    {selectedFeedback.title}
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col space-y-2 p-4 bg-gray-100 rounded-lg">
                                        {selectedFeedback.messages.length > 0 ? (
                                            selectedFeedback.messages.map((msg) => (
                                                <div key={msg.id} className={`p-3 rounded-lg shadow-md max-w-xs ${msg.role === "ADMIN" ? "bg-green-200 self-end" : "bg-white"}`}>
                                                    <p>{msg.message}</p>
                                                    <p className="text-xs text-gray-400 text-right">
                                                        {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No messages available</p>
                                        )}
                                    </div>
                                    <Input
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                        placeholder="Type your reply here..."
                                        className="mb-4 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSendReply();
                                            }
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        ) : (
                            <motion.p className="text-gray-500 text-lg text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                Select a feedback to view details or try refreshing the list.
                            </motion.p>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;