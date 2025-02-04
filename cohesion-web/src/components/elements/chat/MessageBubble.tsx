import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/common';
import { codeFileExtensions } from '@/utils/constants';
import { _copyContent } from '@/utils/lib';
import { CheckIcon, Copy, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';

interface ChatMessageBubbleProps {
    message: Message;
}

const ChatMessageBubble = ({ message }: ChatMessageBubbleProps) => {
    const [copied, setCopied] = useState<string | null>(null);
    const [copyContent, setCopyContent] = useState(false)
    const isUser = message.role === 'user';

    const content = message.content;

    const handleCopyCode = async (code: string) => {
        try {
            await _copyContent(code)
            setCopied(code);
            toast.success("Copied Code Block🧑‍💻")
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            toast.error("Error while copying code")
            console.error('Failed to copy:', err);
        }
    };

    const handleContentCopy = async (content: string) => {
        try {
            setCopyContent(true)
            await _copyContent(content)
            toast.success("Content Copied🎁")
            setTimeout(() => setCopyContent(false), 2000);
        } catch (err) {
            toast.error("Error while copying content")
            console.error('Failed to copy:', err);
        }
    }

    const renderers = {
        code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const code = String(children).replace(/\n$/, '');

            return !inline && match ? (
                <div className="my-4 relative group">
                    <div className='bg-black h-8 rounded-t-lg flex  items-center px-2 justify-between'>
                        <h1 className='text-white text-xs'>
                            {codeFileExtensions[match[1]] ?? match[1]}
                        </h1>
                        <div
                            className='cursor-pointer text-xs'
                            onClick={() => handleCopyCode(code)}
                            aria-label="Copy code"
                        >
                            {copied === code ? (
                                <div className='text-gray-200 flex gap-1'>
                                    <CheckIcon className="h-4 w-4 text-green-500" />
                                    copied
                                </div>
                            ) : (
                                <div className='flex gap-1 text-gray-200 '>
                                    <CopyIcon className="h-4 w-4" />
                                    copy
                                </div>
                            )}
                        </div>
                    </div>
                    <SyntaxHighlighter
                        language={match[1]}
                        style={vscDarkPlus}
                        className="!p-4 !m-0 !rounded-b-lg"
                        {...props}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800" {...props}>
                    {children}
                </code>
            );
        },
        p: ({ children }: { children: React.ReactNode }) => (
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>
        ),
        h1: ({ children }: { children: React.ReactNode }) => (
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{children}</h1>
        ),
        h2: ({ children }: { children: React.ReactNode }) => (
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{children}</h2>
        ),
        h3: ({ children }: { children: React.ReactNode }) => (
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">{children}</h3>
        ),
        ul: ({ children }: { children: React.ReactNode }) => (
            <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }: { children: React.ReactNode }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
            <li className="ml-4 text-gray-700 dark:text-gray-300">{children}</li>
        ),
        blockquote: ({ children }: { children: React.ReactNode }) => {
            <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic my-4">
                {children}
            </blockquote>
        },
        table: ({ children }: { children: React.ReactNode }) => (
            <div className="overflow-x-auto mb-4 bg-red-400">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    {children}
                </table>
            </div>
        ),
        th: ({ children }: { children: React.ReactNode }) => (
            <th className="px-4 py-2 bg-gray-50 dark:bg-gray-800">{children}</th>
        ),
        td: ({ children }: { children: React.ReactNode }) => (
            <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">{children}</td>
        ),
    };

    return (
        <div
            className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
            role="article"
            aria-label={`${isUser ? 'User' : 'AI'} message`}
        >
            <div
                className={`
          ${isUser ? 'bg-black/10 dark:bg-gray-200/10 rounded-3xl max-w-xl' : 'w-full'} 
          shadow-none transition-all duration-200 hover:shadow-sm py-2 px-4`}
            >
                <ReactMarkdown
                    components={renderers as any}
                    className="prose prose-sm max-w-none dark:prose-invert"
                >
                    {content}
                </ReactMarkdown>
                <div className='flex items-center'>
                    {
                        !isUser &&
                        <div className='flex items-center gap-2'>
                            {message.model ? <Badge>{message.model}</Badge> : null}
                            <Button className='border-none' variant={'outline'} size={'icon'} onClick={() => { if (!content) return; handleContentCopy(content) }}>
                                {
                                    !copyContent ?
                                        <Copy className='w-4 h-4 cursor-pointer' /> :
                                        <CheckIcon className='w-4 h-4 cursor-not-allowed text-green-500' />
                                }
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ChatMessageBubble;