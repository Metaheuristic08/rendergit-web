import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, CheckCircle, AlertCircle } from 'lucide-react'

// Mock data - in real app, this would come from API/database
const queueItems = [
  {
    id: 1,
    owner: 'torvalds',
    name: 'linux',
    status: 'processing',
    progress: 65,
    addedAt: '2025-10-27 10:30',
  },
  {
    id: 2,
    owner: 'microsoft',
    name: 'vscode',
    status: 'queued',
    progress: 0,
    addedAt: '2025-10-27 11:15',
  },
  {
    id: 3,
    owner: 'golang',
    name: 'go',
    status: 'completed',
    progress: 100,
    addedAt: '2025-10-27 09:00',
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case 'processing':
      return <Clock className="h-5 w-5 text-blue-500" />
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case 'error':
      return <AlertCircle className="h-5 w-5 text-red-500" />
    default:
      return <Clock className="h-5 w-5 text-muted-foreground" />
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'processing':
      return <Badge>Processing</Badge>
    case 'completed':
      return <Badge variant="secondary">Completed</Badge>
    case 'queued':
      return <Badge variant="outline">Queued</Badge>
    case 'error':
      return <Badge variant="destructive">Error</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function QueuePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Processing Queue</h1>
          <p className="text-muted-foreground">
            Monitor the status of repositories being processed
          </p>
        </div>

        <Separator className="mb-8" />

        <div className="grid gap-6">
          {queueItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(item.status)}
                    <div>
                      <CardTitle className="text-xl mb-1">
                        {item.owner}/{item.name}
                      </CardTitle>
                      <CardDescription>
                        Added at: {item.addedAt}
                      </CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              </CardHeader>
              <CardContent>
                {item.status === 'processing' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {item.status === 'completed' && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Processing completed successfully! View documentation →
                  </p>
                )}
                {item.status === 'queued' && (
                  <p className="text-sm text-muted-foreground">
                    Waiting in queue...
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {queueItems.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No repositories in queue</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
