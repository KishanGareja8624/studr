import Alert from "./Alert";

interface AlertData {
  text: string;
  action: string;
}

const AlertsList: React.FC = () => {
  const alerts: AlertData[] = [
    { text: "you're worry", action: "Change the verb form" },
    { text: "effect", action: "Correct your spelling" },
    { text: "helps", action: "Change the verb form" },
    { text: "to", action: "Replace the word" },
    { text: "error", action: "Add an article" },
    { text: "speling", action: "Correct your spelling" },
    { text: "and", action: "Add a comma" },
  ];

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-bold">All alerts</h2>
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <Alert key={index} text={alert.text} action={alert.action} />
        ))}
      </div>
    </div>
  );
};

export default AlertsList;
