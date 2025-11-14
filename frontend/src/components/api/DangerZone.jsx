import { Button } from "../common/Button";

export default function DangerZone({ revokeKey }) {
    return (
        <div className="mt-10 p-5 border border-red-300 bg-red-50 rounded-xl">
            <h3 className="text-lg font-semibold text-red-700">Revoke API Key</h3>
            <p className="text-red-600 text-sm mt-1">
                Once revoked, this key cannot be recovered. Any apps using it will lose access.
            </p>

            <Button
                variant="danger"
                size="md"
                className="mt-4"
                onClick={revokeKey}
            >
                Revoke API Key
            </Button>
        </div>
    );
}
