const Card = ({ children }) => <div className="bg-white shadow-lg rounded-lg p-4">{children}</div>;

const CardHeader = ({ children }) => <div className="font-bold text-lg">{children}</div>;

const CardContent = ({ children }) => <div>{children}</div>;

const CardTitle = ({ children }) => <h3 className="text-gray-700">{children}</h3>;

export { Card, CardHeader, CardContent, CardTitle };
