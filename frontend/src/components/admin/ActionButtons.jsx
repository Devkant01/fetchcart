import React, {useState} from "react";
import { Button } from "../common/Button";

export default function ActionButtons({ loading }) {
    const [text, setText] = useState("Save as Draft");
    return (
        <div className="w-full flex gap-3 pt-2">
            <Button variant="outline" size="md" className="w-1/2" type="button" onClick={() => {
                setText("Stay tuned — launching soon!");
                setTimeout(() => setText("Save as Draft"), 1000);
            }}>
                {text}
            </Button>

            <Button size="md" className="w-1/2" disabled={loading} type="submit">
                {loading ? "Publishing..." : "Publish Product"}
            </Button>
        </div>
    );
}
