import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/registry/refer/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/refer/ui/card"
import { Input } from "@/registry/refer/ui/input"
import { Label } from "@/registry/refer/ui/label"
import { Badge } from "@/registry/refer/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/refer/ui/tabs"

export function TabsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="account" className="max-w-[400px]">
        <TabsList className="">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="border border-[.5px]">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="profile">
            Profile
            <Badge
              variant="secondary"
              className="group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground -mr-0.5 h-[18px] min-w-[18px] rounded-md px-1 py-0.5 opacity-50 group-data-[state=active]:opacity-80"
            >
              1
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="account">
            Account
            <Badge
              variant="secondary"
              className="group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground -mr-0.5 h-[18px] min-w-[18px] rounded-md px-1 py-0.5 opacity-50 group-data-[state=active]:opacity-80"
            >
              27
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="settings" disabled>
            Disabled
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">
            <AppWindowIcon />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            <CodeIcon />
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="profile">
        <TabsList variant="subtle">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-wrap gap-8">
        <Tabs defaultValue="profile" orientation="vertical">
          <TabsList className="w-40">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs defaultValue="profile" orientation="vertical">
          <TabsList variant="line">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
