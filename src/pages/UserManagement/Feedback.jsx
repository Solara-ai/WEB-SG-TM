import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getFeedBack,
  getFeedBackDetail,
  sendFeedBack,
} from "../../api/FeedBackApi";
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
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchFeedback(currentPage);
  }, [currentPage]);

  const fetchFeedback = async (page) => {
    setLoading(true); // Show loading indicator when fetching
    try {
      const response = await getFeedBack(page);
      if (response?.data) {
        setFeedbackList(
          Array.isArray(response.data.elementList)
            ? response.data.elementList
            : []
        );
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
    } finally {
      setLoading(false); // Hide loading indicator when fetching is complete
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
        setSelectedFeedback((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            { message: replyMessage, role: "ADMIN", createdAt: new Date() },
          ],
        }));
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="h-full overflow-y-auto" />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header />
        <div className="flex flex-row gap-4 p-4 h-[calc(100vh-4rem)] overflow-hidden">
          {/* Feedback List */}
          <motion.div
            className="w-1/4 border-r p-4 bg-white rounded-lg shadow-xl h-full overflow-y-auto"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.68, -0.55, 0.27, 1.55],
            }}
          >
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
              User Feedback
            </h2>
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full"></div>
              </div>
            ) : (
              <ul>
                {feedbackList.length > 0 ? (
                  feedbackList.map((feedback) => (
                    <motion.li
                      key={feedback.id}
                      className="p-4 border-b cursor-pointer hover:bg-blue-50 transition-all rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg"
                      onClick={() => handleSelectFeedback(feedback.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <Mail className="text-blue-500" /> {feedback.message}
                    </motion.li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No feedback available
                  </p>
                )}
              </ul>
            )}

            <div className="flex justify-between items-center mt-4 px-4">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all shadow-lg"
              >
                <span className="transform rotate-180"></span> Previous
              </Button>

              <span className="text-gray-700 text-lg">
                Page {currentPage + 1} / {totalPages}
              </span>

              <Button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages - 1 ? prev + 1 : prev
                  )
                }
                disabled={currentPage >= totalPages - 1}
                className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all shadow-lg"
              >
                Next <span className="transform rotate-0"></span>
              </Button>
            </div>
          </motion.div>

          {/* Feedback Detail */}
          <motion.div
            className="flex-1 h-full flex flex-col overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {selectedFeedback ? (
              <>
                <div className="text-2xl font-semibold text-gray-700 mb-4 shadow-xl bg-white p-3 rounded-lg sticky top-0 z-10">
                  Feedback Detail {selectedFeedback.title}
                </div>

                <Card className="p-6 shadow-xl bg-white rounded-lg flex flex-col flex-1 overflow-y-auto">
                  <CardHeader className="text-xl font-bold text-center text-gray-700 sticky top-0 bg-white z-10 border-b py-3">
                    {selectedFeedback.title}
                  </CardHeader>

                  <div className="flex-1 p-4 bg-gray-100 rounded-lg overflow-y-auto">
                    <CardContent className="flex-1 p-4 bg-gray-100 rounded-lg overflow-y-auto">
                      <div className="flex flex-col space-y-4">
                        {selectedFeedback.messages.length > 0 ? (
                          selectedFeedback.messages.map((msg, index) => (
                            <motion.div
                              key={index}
                              className={`p-4 rounded-lg shadow-md max-w-xs ${
                                msg.role === "ADMIN"
                                  ? "bg-green-200 self-end"
                                  : "bg-white"
                              }`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: index * 0.1,
                                ease: "easeInOut",
                              }}
                            >
                              <p className="text-gray-800">{msg.message}</p>
                              <p className="text-xs text-gray-500 text-right mt-2">
                                {new Date(msg.createdAt).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-center">
                            No messages available
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </div>

                  <div className="sticky bottom-0 bg-white p-4 mt-2 flex gap-2">
                    <Input
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="flex-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendReply();
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendReply}
                      disabled={!replyMessage.trim()}
                      className="transition-all bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Send
                    </Button>
                  </div>
                </Card>
              </>
            ) : (
              <p className="text-gray-500 text-lg text-center h-full flex items-center justify-center">
                Select a feedback to view details or try refreshing the list.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
