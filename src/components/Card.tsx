/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rQndJOMCzO6
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

export default function Component() {
  return (
    <Card className="max-w-lg mx-auto bg-white rounded-xl shadow-md dark:bg-zinc-800">
      <CardHeader className="flex flex-col items-center space-y-4 p-6">
        <Avatar className="border-4 border-gray-600 dark:border-gray-400">
          <AvatarImage
            alt="Twitter Profile"
            src="/placeholder.svg?height=200&width=200"
          />
          <AvatarFallback>TP</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <CardTitle className="text-lg font-semibold dark:text-white">
            Profile Name
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-200">
            @handle
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          This is a short bio for the Twitter profile. It provides information
          about the profile.
        </p>
        <div className="flex items-center justify-center mt-4">
          <svg
            className=" h-5 w-5 text-gray-500 dark:text-gray-300 mr-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 7V5c0-1.1.9-2 2-2h2" />
            <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
            <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
            <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
            <rect height="5" rx="1" width="7" x="7" y="7" />
            <rect height="5" rx="1" width="7" x="10" y="12" />
          </svg>
          <span className="text-sm text-gray-500 dark:text-gray-200">
            1.5M followers
          </span>
        </div>
        <div className="flex items-center justify-center mt-4">
          <svg
            className=" h-5 w-5 text-gray-500 dark:text-gray-300 mr-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span className="text-sm text-gray-500 dark:text-gray-200">
            2.5K favorites
          </span>
        </div>
        <div className="flex items-center justify-center mt-4">
          <svg
            className=" h-5 w-5 text-gray-500 dark:text-gray-300 mr-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-sm text-gray-500 dark:text-gray-200">
            500 friends
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
