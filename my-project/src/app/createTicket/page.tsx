import PageLayout from "../components/navbar&Footerlayout/layout";
import GenerateTicketForm from "../components/ticketForms/forms";

export default function CreateTicket() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 ">
        <GenerateTicketForm />
      </div>
    </PageLayout>
  );
}
