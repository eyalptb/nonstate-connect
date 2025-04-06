
import { useParams } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { useTranslation } from "react-i18next";

const ProposalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation(['governance']);

  return (
    <Container className="py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Proposal Details</h1>
        <p className="text-muted-foreground">
          View detailed information about this governance proposal
        </p>
        <div className="mt-8 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Proposal #{id}
          </h2>
          <p>
            This is a placeholder for the proposal details. In a real application, this would show
            the actual proposal content, voting status, and allow for interaction.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ProposalDetail;
