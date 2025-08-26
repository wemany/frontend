import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    company: string;
}

export function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
    return (
        <Card className="w-full max-w-lg text-white mx-auto bg-transparent backdrop-blur-xl border-none">
            <CardContent className="text-lg font-semibold">
                <p>{quote}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start px-6 pb-6 text-gray-600 text-sm">
                <p className="text-white">− {author}, {role}, {company}</p>
            </CardFooter>
        </Card>
    );
}